import { InferSchemaType, model, models, Schema} from "mongoose";

// User schema and model
const userSchema = new Schema({
  fullname: {
    firstname: String,
    lastname: String,
  },
  username: {type: String, required: true, unique: true, lowercase: true},
  username_update: {type: Number, default: () => Date.now()},
  email: {type: String, unique: true, lowercase: true},
  password: {type: String},
  reset_password_str: String,
  reset_password_str_expire: Number,
  provider: String,
  provider_id: String,
  verified: {type: Boolean, default: false},
  image_file: Buffer,
  image_url: String,
  date_of_birth: Date,
  bio: String,
  following: [{type: Schema.Types.ObjectId, ref: "users"}],
  followers: [{type: Schema.Types.ObjectId, ref: "users"}],
  eChats: [{type: Schema.Types.ObjectId, ref: "echats"}],
  bookmarked: [{type: Schema.Types.ObjectId, ref: "echats"}],
  liked: [{type: Schema.Types.ObjectId, ref: "echats"}],
  notifications: [{type: Schema.Types.ObjectId, ref: "notifications"}],
  category_interests: [{type: String}],
  theme: {
    type: String,
    default: "dark"
  },
  created_at: {type: Number, default: () => Date.now()}
});

type users = InferSchemaType<typeof userSchema>;
export const usersCollection = models.users || model<users>("users", userSchema);


//otp schema and model
const otpSchema = new Schema({
  user_id: {type: String, required: true},
  otp_code: {type: String, required: true},
  created_at: {type: Number, default: () => Date.now()}
});

type otpVerification = InferSchemaType<typeof otpSchema>;
export const otpCollection = models.otp || model<otpVerification>("otp", otpSchema);