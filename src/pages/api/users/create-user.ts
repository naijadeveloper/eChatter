import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection, otpCollection } from "@/database/databaseModels";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { genDigits } from "@/utilities/digits_only";

//transporter service is Brevo(fka sendinblue)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    await connectMongo();
  }catch(error){
    return res.status(500).json({error: "Failed to connect to server"})
  }

  if(req.method === "POST") {
    try {
      let { email, username, password } = req.body;
      if(!email || !username || !password) {
        return res.status(400).json({error: "A field is empty"});
      }

      // check if user already exist
      const user = await usersCollection.find({email}).count().exec();
      if(user) return res.status(403).json({error: "A user was found with the same email. Try login instead"});

      // check if username already exist, if it does
      // let's generate a new username
      let digits = ""
      let num_of_digits = 1;
      let validUsername = false;
      do{
        // attach
        let new_username = username + digits;
        // check db
        const num_of_user = await usersCollection.find({username: new_username}).count().exec();
        if(num_of_user) {
          validUsername = false;
        }else {
          validUsername = true;
          username = new_username;
        }
        // generate a new set of digits based on num_of_digits
        digits = genDigits(num_of_digits);
        // increment num_of_digits by 1;
        num_of_digits++;
      }while(!validUsername);

      // encrypt password before inserting
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(String(password), salt);
      // when you want to check user later ... const match = await bcrypt.compare(passwordReceivedFromUser, hashedPasswordSavedInDB) ... if(match) //user exists...

      // insert new user to users collection
      const createdUser = await usersCollection.create({
        email,
        username,
        password: hashedPassword
      })
      // run function to generate otp and save in otp collection
      await otpGeneration(createdUser._id.toString(), email);

      const {_id, email: useremail, username: name, verified, theme, category_interests} = createdUser;
      
      return res.status(200).json({ _id, email: useremail, username: name, verified, theme, category_interests });
    }catch(error) {
      return res.status(500).json({error: "Couldn't save or verify your account. Please try again."});
    }
  }else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({error: "Method not allowed"});
  }
}

async function otpGeneration(_id: string, email: string) {
  // generate random 8 char number and encrypt it
  const otpNumber = String(Math.floor(10000000 + Math.random() * 90000000));
  
  const salt = await bcrypt.genSalt();
  const hashedOtp = await bcrypt.hash(otpNumber, salt);
  // create otp document and save the _id of user created and the generated otp code
  await otpCollection.create({
    user_id: _id,
    otp_code: hashedOtp
  });
  //use nodemailer to send to user the email
  await transporter.sendMail({
    from: "noreply@echatter.com",
    to: email,
    subject: "eChatter Account Verification",
    html: `<p>This one-time-password was generated and sent to your email to verify your eChatter account, please enter this code in order to verify your account. This code will expire an hour from now <br /><br /> <strong style="font-size: 24px">${otpNumber}</strong>
    </p>`
  });
}