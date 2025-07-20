import { Response } from "express";
import { contentschema } from "../Validations/control.validation";
import { ContentModel } from "../Models/Contentmodel";
import { Types } from "mongoose";
import { AuthReq } from "../Middleware/verifytoken";
import { TagModel } from "../Models/Tagmodel";

// Create Content
export const createContent = async (req: AuthReq, res: Response) => {
  try {
    const parseD = contentschema.safeParse(req.body);

    if (!parseD.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parseD.error.flatten().fieldErrors,
      });
    }

    const { title, type, link, tags = [] } = parseD.data;

    const tagIds = [];
    for (const tagTitle of tags) {
      const titleLower = tagTitle.toLowerCase().trim();

      let tag = await TagModel.findOne({
        title: titleLower,
        userId: req.userId,
      });

      if (!tag) {
        tag = await TagModel.create({ title: titleLower, userId: req.userId });
      }

      tagIds.push(tag._id);
    }

    const newContent = await ContentModel.create({
      title,
      type,
      link,
      tags: tagIds,
      userId: req.userId,
    });

    const populatedContent = await ContentModel.findById(
      newContent._id
    ).populate("tags");

    return res.status(201).json({
      message: "Content created successfully",
      content: populatedContent,
    });
  } catch (error) {
    console.error("Error creating content:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get All Content for User
export const getUserContent = async (req: AuthReq, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const contents = await ContentModel.find({ userId: req.userId }).populate(
      "tags"
    );

    return res.status(200).json({ contents });
  } catch (error) {
    console.error("Error fetching content:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete Content and Related Unused Tags
export const deleteContent = async (req: AuthReq, res: Response) => {
  try {
    const contentID = req.params.id;
    if (!Types.ObjectId.isValid(contentID)) {
      return res.status(400).json({ message: "Invalid content ID" });
    }

    const content = await ContentModel.findById(contentID);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (content.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this content" });
    }

    const tagIds = content.tags || [];

    // Delete content
    await ContentModel.findByIdAndDelete(contentID);

    // Clean up unused tags
    for (const tagId of tagIds) {
      const tagInUse = await ContentModel.exists({ tags: tagId });
      if (!tagInUse) {
        await TagModel.findByIdAndDelete(tagId);
      }
    }

    return res.status(200).json({
      message: "Content and unused tags deleted successfully",
      deletedContent: content.title,
    });
  } catch (error) {
    console.error("Error deleting content:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
