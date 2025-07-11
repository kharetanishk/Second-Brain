import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL as string;

export async function connectDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`MONGOOSE CONNECTION SUCCESSFUL`);
  } catch (error) {
    console.log(`UNABLE TO CONNECT MONGOOSE ${error}`);
  }
}
