import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";

const mongoUrl = process.env.MONGO_URL as string;

export async function connectDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`MONGOOSE CONNECTION SUCCESSFUL`);
  } catch (error) {
    console.log(`UNABLE TO CONNECT MONGOOSE ${error}`);
  }
}

interface UserType {
  name: string;
  email: string;
  password: string;
}
const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<UserType>("User", UserSchema);
