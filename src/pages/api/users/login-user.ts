import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    await connectMongo();
  }catch(error){
    return res.status(500).json({error: "Failed to connect to server"})
  }

  if(req.method == "POST") {
    try{
      // get info from user
      const { email: useremail, password } = req.body;
      if(!useremail || !password) return res.status(400).json({error: "Empty field"});
  
      // check if user exist
      const user = await usersCollection.findOne({email: useremail}).exec();
      if(!user) return res.status(404).json({error: "The email and/or password is wrong"});

      // check if otp is valid
      const hash = user?.password!;
      const match = await bcrypt.compare(password, hash);
  
      // if match is false
      if(!match) return res.status(404).json({error: "The email and/or password is wrong"});

      // send to user necessary info
      const {_id, email, username, verified, theme, category_interests} = user;
      
      return res.status(200).json({ _id, email, username, verified, theme, category_interests });
    }catch(error) {
      return res.status(500).json({error: "Couldn't save or verify your account. Please try again."});
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method not allowed");
  }
}