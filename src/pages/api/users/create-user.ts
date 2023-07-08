import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() => res.status(500).end("Server error"))
  
  // check method
  if(req.method === "POST") {
    const { email, username, password } = req.body;
    if(!email || !username || !password) {
      return res.status(400).json({error: "Empty field"})
    }

    // check if user already exist
    const user = await usersCollection.find({email}).count();
    if(!user) return res.status(404).json({error: "User already exist"});

    // insert new user to users collection
    const createdUser = await usersCollection.create({
      email,
      username,
      password
    })
    try{
      await createdUser.save();
      // run function to generate otp and save in otp collection
      otpGeneration(createdUser._id.toString())
    }catch(error) {return res.status(500).json({error: "Couldn't save"})}
  }else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("method not allowed");
  }
}

async function otpGeneration(_id: string) {
  // generate random 8 char number and encrypt it
  // create otp document and save the _id of user created and the generated otp code
  //use nodemailer to send to user the email
}