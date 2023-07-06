import mongoose from "mongoose";
const MONGO_DB_URL = process.env.MONGO_DB_CONNECT!;

const connectMongo = async () => {
  await mongoose.connect(MONGO_DB_URL);
}

export default connectMongo;