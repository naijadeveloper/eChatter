import mongoose from "mongoose";

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  verified: Boolean,
  otp: Number,
});

export const usersCollection = mongoose.model("users", userSchema);