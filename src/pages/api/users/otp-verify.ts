import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection, otpCollection } from "@/database/databaseModels";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    await connectMongo();
  }catch(error){
    return res.status(500).json({error: "Failed to connect to server"})
  }

  if(req.method == "PUT") {
    try{
      // get info from user
      const { userId: user_id, inputOtpCode } = req.body;
      if(!user_id || !inputOtpCode) return res.status(400).json({error: "Please log in or sign up first, before account verification"});
  
      // check if user exist and if user is verified already
      const user = await usersCollection.findById(user_id).exec();
      if(!user) return res.status(404).json({error: "You are not a registered user"});

      if(user.verified) {
        return res.status(404).json({error: "You are already verified"});
      }

      // get otp doc from otpCollection
      const otpDoc = await otpCollection.findOne({user_id}).exec();
      if(!otpDoc) return res.status(404).json({error: "The otp has expired. Please try again"});

      // check if time has expired
      const currentTime = Date.now();
      const otpDatePlusOneHour = otpDoc?.created_at! + 3600000;
  
      if(currentTime >= otpDatePlusOneHour){
        // remove otp doc from collection
        await otpCollection.deleteOne({user_id}).exec();
        return res.status(404).json({error: "The otp has expired. Please try again"});
      }
  
      // check if otp is valid
      const hash = otpDoc?.otp_code!;
      const match = await bcrypt.compare(inputOtpCode, hash);
  
      // if match is false
      if(!match) return res.status(404).json({error: "wrong otp code"});
  
      // change user's verification to true
      user.verified = true;
      await user.save();

      // delete otp doc
      await otpCollection.deleteOne({user_id}).exec();

      return res.status(200).json({ success: "successfull" });
    }catch(error) {
      return res.status(500).json({error: "Couldn't save or verify your account. Please try again."});
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end("Method not allowed");
  }
}