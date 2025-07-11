import { Schema, model } from "mongoose";

export interface UserType {
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
