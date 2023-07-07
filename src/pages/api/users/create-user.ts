import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo()
  
  // check method
  if(req.method === "POST") {
    //insert new user to users collection

  }else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("method not allowed");
  }
}