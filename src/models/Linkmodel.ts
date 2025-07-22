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
      required: true,
    },
    hash: { type: String, unique: true, required: true },
    visibility: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

LinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const LinkModel = model<LinkType>("Link", LinkSchema);
