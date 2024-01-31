import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

export default connectDb;
