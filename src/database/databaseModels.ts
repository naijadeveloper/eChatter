import { InferSchemaType, model, models, Schema} from "mongoose";

// User schema and model
const userSchema = new Schema({
  fullname: {
    firstname: String,
    lastname: String,
  },
  username: {type: String, required: true, unique: true, lowercase: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true},
  verified: {type: Boolean, default: false},
  image: Buffer,
  dateOfBirth: Date,
  bio: String,
  following: [{type: Schema.Types.ObjectId, ref: "users"}],
  followers: [{type: Schema.Types.ObjectId, ref: "users"}],
  eChats: [{type: Schema.Types.ObjectId, ref: "echats"}],
  bookmarked: [{type: Schema.Types.ObjectId, ref: "echats"}],
  liked: [{type: Schema.Types.ObjectId, ref: "echats"}],
  notifications: [{type: Schema.Types.ObjectId, ref: "notifications"}],
  theme: {
    type: String,
    default: "dark"
  },
  createdAt: {type: Number, default: () => Date.now()}
});

type users = InferSchemaType<typeof userSchema>;
export const usersCollection = models.users || model<users>("users", userSchema);


//otp schema and model
const otpSchema = new Schema({
  userId: {type: String, required: true},
  otpCode: {type: String, required: true},
  createdAt: {type: Number, default: () => Date.now()}
});

type otpVerification = InferSchemaType<typeof otpSchema>;
export const otpCollection = models.otp || model<otpVerification>("otp", otpSchema);