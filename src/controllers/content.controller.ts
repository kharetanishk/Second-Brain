import { Response } from "express";
import { contentschema } from "../validations/control.validation";
import { ContentModel } from "../models/Contentmodel";
import { Types } from "mongoose";
import { AuthReq } from "../Middleware/verifytoken";

export const createContent = async (req: AuthReq, res: Response) => {
  try {
    const parseD = contentschema.safeParse(req.body);

    if (!parseD.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parseD.error.flatten().fieldErrors,
      });
    }

    const { title, type, link, tags } = parseD.data;
    const newContent = await ContentModel.create({
      title: title,
      type: type,
      link: link,
      tags: tags?.map((tagId) => new Types.ObjectId(tagId)), //string to objectId
      userId: req.userId,
    });
    return res.status(201).json({
      message: "Content created successfully",
      content: newContent,
    });
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
