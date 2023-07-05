import mongoose from "mongoose";
const MONGO_DB_URL = process.env.MONGO_DB_CONNECT!;

const connectMongo = async () => {
  try{
    const { connection } = await mongoose.connect(MONGO_DB_URL);
    if(connection?.readyState == 1) {
      console.log("DB connected");
    }
  }catch(error) {
    return Promise.reject(error);
  }
}

export default connectMongo;