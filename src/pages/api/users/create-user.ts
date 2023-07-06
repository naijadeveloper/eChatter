import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() => {
    res.status(500).json({error: "Couldn't connect to server"})
  });
  
  if(req.method === "POST") {

  }else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("method not allowed");
  }
}