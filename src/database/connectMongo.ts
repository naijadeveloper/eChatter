import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_CONNECT!;
let connection: typeof mongoose;

const connectMongo = async () => {
  if(!connection) connection = await mongoose.connect(MONGO_DB_URL);
  return connection;
}

export default connectMongo;