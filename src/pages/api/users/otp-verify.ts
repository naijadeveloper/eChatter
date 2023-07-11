import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection, otpCollection } from "@/database/databaseModels";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() => res.status(500).json({error: "server error"}));

  if(req.method == "PUT") {
    try{
      // get info from user
      const { userId, inputOtpCode } = req.body;
      if(!userId || !inputOtpCode) return res.status(400).json({error: "empty field"});
  
      // check if user exist and if user is verified already
      const user = await usersCollection.findById(userId).exec();
      if(!user) return res.status(404).json({error: "user not found"});

      if(user?.verified) return res.status(404).json({error: "user verified"});

      // get otp doc from otpCollection
      const otpDoc = await otpCollection.findOne({userId}).exec();
      if(!otpDoc) return res.status(404).json({error: "otp not found"});

      // check if time as expired
      const currentTime = Date.now();
      const otpDatePlusOneHour = otpDoc?.createdAt! + 3600000;
  
      if(currentTime >= otpDatePlusOneHour){
        // remove otp doc from collection
        await otpCollection.deleteOne({userId}).exec();
        return res.status(404).json({error: "otp expired"});
      }
  
      // check if otp is valid
      const hash = otpDoc?.otpCode!;
      const match = await bcrypt.compare(inputOtpCode, hash);
  
      // if match is false
      if(!match) return res.status(404).json({error: "wrong otp code"});
  
      // change user's verification to true
      user.verified = true;
      await user.save();

      // delete otp doc
      await otpCollection.deleteOne({userId}).exec();

      // send to user necessary info
      const {_id, username, email, theme} = user;
      return res.status(200).json({_id, username, email, theme, success: "success"});
    }catch(error) {
      return res.status(500).json({error: "couldn't save or verify"});
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end("method not allowed");
  }
}