import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo();
  res.status(200).json({name: "enoch"});
}