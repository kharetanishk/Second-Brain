import { Schema, model, Types } from "mongoose";

interface LinkType {
  userId: Types.ObjectId;
  hash: string;
  visibility: boolean;
  expiresAt: Date;
}

const LinkSchema = new Schema<LinkType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    hash: { type: String, unique: true, required: true },
    visibility: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  {
    timestamps: true,
  }
);

export const LinkModel = model<LinkType>("Link", LinkSchema);
