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

  
  if(req.method === "POST") {
    try {
      const { userId, email } = req.body;
      if(!userId || !email) return res.status(400).json({error: "empty field"});
  
      // check user exist
      const user = await usersCollection.findById(userId).exec();
      if(!user) return res.status(404).json({error: "user not found"});
  
      // check verification
      if(user.verified) {
        const {_id, username, email, theme} = user;
        return res.status(200).json({_id, username, email, theme, info: "verified"});
      }
  
      // generate new hash code, check if otp doc exists
      // if it doesn't create it and save the new hash code
      // then send code to email of user
      const otpNumber = String(Math.floor(10000000 + Math.random() * 90000000));
      const salt = await bcrypt.genSalt();
      const hashedOtp = await bcrypt.hash(otpNumber, salt);
  
      let otpDoc = await otpCollection.findOne({userId}).exec();
      if(otpDoc) {
        otpDoc.otpCode = hashedOtp;
        otpDoc.createdAt = Date.now();
  
        await otpDoc.save();
      }else {
        otpDoc = await otpCollection.create({
          userId,
          otpCode: hashedOtp
        });
      }
      //use nodemailer to send to user the email
      await transporter.sendMail({
        from: "noreply@echatter.com",
        to: email,
        subject: "Account verification",
        html: `<p>A new one-time-password was generated and sent to your email again to verify your eChatter account, please enter this code in order to verify your account. This code will expire an hour from now <br /><br /> <strong style="font-size: 24px">${otpNumber}</strong>
        </p>`
      });
    }catch(error) {
      res.status(500).json({error: "couldn't not save or verify"});
    }
  }else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("method not allowed");
  }
}