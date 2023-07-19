import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() => res.status(500).json({error: "Failed to connect to server"}));

  if(req.method == "POST") {
    try{
      // get info from user
      const { email, password } = req.body;
      if(!email || !password) return res.status(400).json({error: "Empty field"});
  
      // check if user exist
      const user = await usersCollection.findOne({email}).exec();
      if(!user) return res.status(404).json({error: "The email and/or password is wrong"});

      // check if otp is valid
      const hash = user?.password!;
      const match = await bcrypt.compare(password, hash);
  
      // if match is false
      if(!match) return res.status(404).json({error: "The email and/or password is wrong"});

      // send to user necessary info
      const {_id, email: useremail, username, verified, theme} = user;
      return res.status(200).json({ _id, useremail, username, verified, theme });
    }catch(error) {
      return res.status(500).json({error: "Couldn't save or verify your account. Please try again."});
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method not allowed");
  }
}