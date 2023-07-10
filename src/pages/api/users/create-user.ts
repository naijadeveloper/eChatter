import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection, otpCollection } from "@/database/databaseModels";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
  connectMongo().catch(() => res.status(500).json({error: "server error"}));
  
  // check method
  if(req.method === "POST") {
    const { email, username, password, fullname } = req.body;
    if(!email || !username || !password) {
      return res.status(400).json({error: "empty field"});
    }

    // check if user already exist
    const user = await usersCollection.find({email}).count().exec();
    if(user) return res.status(404).json({error: "user exists"});

    // encrypt password before inserting
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    //***when you want to check user later ... const match = await bcrypt.compare(passwordReceivedFromUser, hashedPasswordSavedInDB) ... if(match) //user exists...

    // insert new user to users collection
    try {
      const createdUser = await usersCollection.create({
        email,
        username,
        password: hashedPassword,
        fullname
      })
      // run function to generate otp and save in otp collection
      await otpGeneration(createdUser._id.toString(), email);

      const { _id } = createdUser;
      return res.status(200).json({ _id, email });

    }catch(error) {return res.status(500).json({error: "couldn't save or verify"})}

  }else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("method not allowed");
  }
}

async function otpGeneration(_id: string, email: string) {
  // generate random 8 char number and encrypt it
  const otpNumber = String(Math.floor(10000000 + Math.random() * 90000000));
  
  const salt = await bcrypt.genSalt();
  const hashedOtp = await bcrypt.hash(otpNumber, salt);
  // create otp document and save the _id of user created and the generated otp code
  await otpCollection.create({
    userId: _id,
    otpCode: hashedOtp
  });
  //use nodemailer to send to user the email
  await transporter.sendMail({
    from: "noreply@echatter.com",
    to: email,
    subject: "Account verification",
    html: `<p>This one-time-password was generated and sent to your email to verify your eChatter account, please enter this code in order to verify your account. This code will expire an hour from now <br /><br /> <strong style="font-size: 24px">${otpNumber}</strong>
    </p>`
  });
}