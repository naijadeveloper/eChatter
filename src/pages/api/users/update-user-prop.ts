import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "@/database/connectMongo";
import { usersCollection } from "@/database/databaseModels";
import { userSchemaProps } from "@/utilities/echat_variables";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    await connectMongo();
  }catch(error){
    return res.status(500).json({error: "Failed to connect to server"});
  }

  if(req.method === "PUT") {
    // update a single prop
    try {
      const { userId, propertyName, propertyValue } = req.body;

      // first check if user exist
      const user = await usersCollection.findById(userId).exec();
      if(!user) {
        res.status(404).json({error: "You are not a registered user"});
        return undefined;
      }

      // update or add new property
      user[propertyName] = propertyValue;
      await user.save();
    } catch(error) {
      return res.status(500).json({error: "Couldn't update property. Please try again."});
    }
    //
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({error: "Method not allowed"});
  }
}