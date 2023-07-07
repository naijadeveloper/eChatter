import mongoose, { InferSchemaType, model, Schema} from "mongoose";

// User schema
const userSchema = new Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  verified: Boolean,
  otp: Number,
});

type users = InferSchemaType<typeof userSchema>

export const usersCollection = model<users>("users", userSchema);