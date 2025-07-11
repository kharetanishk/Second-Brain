import { Response } from "express";
import { TagModel } from "../models/Tagmodel";
import { tagSchema } from "../validations/tag.validation";
import { AuthReq } from "../Middleware/verifytoken";

export const createTag = async (req: AuthReq, res: Response) => {
  try {
    const parseD = tagSchema.safeParse(req.body);
    if (!parseD.success) {
      return res.status(400).json({
        message: "Invalid tag input",
        error: parseD.error.flatten().fieldErrors,
      });
    }
    const { title } = parseD.data;
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No userId found" });
    }

    const existingTag = await TagModel.findOne({
      title: title.toLowerCase(),
      userId: req.userId,
    });
    if (existingTag) {
      return res.status(409).json({
        message: "Tag already exists",
        tag: existingTag,
      });
    }
    const newTag = await TagModel.create({
      title: title.toLowerCase(),
      userId: req.userId,
    });
    return res.status(201).json({
      message: "Tag created successfully",
      tag: newTag,
    });
  } catch (err) {
    console.error("Tag creation error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
