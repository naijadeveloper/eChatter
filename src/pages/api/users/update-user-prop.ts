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
      const { userId, propertyNames, propertyValues } = req.body;

      if(propertyNames.length !== propertyValues.length) {
        throw new Error(""); // run the catch block of the try&catch block
      }

      // first check if user exist
      const user = await usersCollection.findById(userId).exec();
      if(!user) {
        res.status(404).json({error: "You are not a registered user"});
        return undefined;
      }

      // check if all propertyNames ares in the userSchemaProps
      for(let i = 0; i < propertyNames.length; i++) {
        if(!userSchemaProps.includes(propertyNames[i])) {
          res.status(404).json({error: "Invalid property name"});
          return undefined;
        }
      }

      // update property/ies
      for(let i = 0; i < propertyNames.length; i++) {
        user[propertyNames[i]] = propertyValues[i];
      }
      await user.save();
      res.status(200).json({success: "Successfully updated properties on database"});
    } catch(error) {
      return res.status(500).json({error: "Couldn't update properties. Please try again."});
    }
    //
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({error: "Method not allowed"});
  }
}