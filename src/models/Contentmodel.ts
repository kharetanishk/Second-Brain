import { Schema, model, Types } from "mongoose";

type ContentTypeEnum = "article" | "image" | "video" | "pdf";

interface LinktType {
  url: string;
  hash?: string;
}

interface ContentType {
  title: string;
  type: ContentTypeEnum;
  link?: LinktType;
  tags?: Types.ObjectId[];
  userId: Types.ObjectId;
}

const LinkSchema = new Schema<LinktType>({
  url: { type: String, required: true },
  hash: { type: String },
});

const ContentSchema = new Schema<ContentType>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["article", "image", "video", "pdf"],
      required: true,
    },
    link: { type: LinkSchema },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export const ContentModel = model<ContentType>("Content", ContentSchema);
