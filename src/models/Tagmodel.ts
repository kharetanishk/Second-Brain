import { Schema, Types, model } from "mongoose";

interface TagType {
  title: string;
  userId: Types.ObjectId;
}
const TagSchema = new Schema<TagType>(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export const TagModel = model<TagType>("Tag", TagSchema);
