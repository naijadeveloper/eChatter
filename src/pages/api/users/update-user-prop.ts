import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    await connectMongo();
  }catch(error){
    return res.status(500).json({error: "Failed to connect to server"});
  }

  if(req.method === "PUT") {
    // update a single prop
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({error: "Method not allowed"});
  }
}