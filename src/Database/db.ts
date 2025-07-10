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
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  avatar?: string;
}

const UserSchema = new Schema<UserType>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    googleId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<UserType>("User", UserSchema);
