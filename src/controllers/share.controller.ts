import { Request, Response } from "express";
import { AuthReq } from "../Middleware/verifytoken";
import { LinkModel } from "../Models/Linkmodel";
import crypto from "crypto";
import { UserModel } from "../Models/Usermodel";
import { ContentModel } from "../Models/Contentmodel";

const EXPIRY_DURATION = 7 * 24 * 60 * 60 * 1000;

//shareBrain
export const shareBrain = async (req: AuthReq, res: Response) => {
  try {
    const { share } = req.body;

    if (typeof share !== "boolean") {
      return res.status(400).json({ message: "Invalid share v alue" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No userId" });
    }

    // console.log(`[SHARE BRAIN] userId=${req.userId}, share=${share}`);

    const existingLink = await LinkModel.findOne({ userId: req.userId });

    if (share) {
      // Re-share or create a new one
      if (existingLink) {
        existingLink.visibility = true;
        existingLink.expiresAt = new Date(Date.now() + EXPIRY_DURATION);
        await existingLink.save();

        return res.status(200).json({
          message: "Sharing re-enabled",
          shareLink: `${process.env.FRONTEND_URL}/brain/${existingLink.hash}`,
        });
      }

      //  Create new unique hash
      let hash = "";
      let isUnique = false;
      while (!isUnique) {
        hash = crypto.randomBytes(12).toString("hex");
        const found = await LinkModel.findOne({ hash });
        if (!found) isUnique = true;
      }

      const newLink = await LinkModel.create({
        userId: req.userId,
        hash,
        visibility: true,
        expiresAt: new Date(Date.now() + EXPIRY_DURATION),
      });

      return res.status(201).json({
        message: "Brain shared successfully",
        shareLink: `${process.env.FRONTEND_URL}/brain/${hash}`,
      });
    }

    //  Disable visibility if share === false
    if (existingLink) {
      existingLink.visibility = false;
      await existingLink.save();
      return res.status(200).json({ message: "Sharing disabled" });
    }

    return res.status(404).json({ message: "No share link found to disable" });
  } catch (error) {
    console.error("Error in shareBrain:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//getSharedBrain
export const getSharedBrain = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const link = await LinkModel.findOne({ hash });

    if (!link) {
      return res.status(404).json({ message: "Invalid share link" });
    }
    // console.log(link);

    if (!link.visibility || new Date() > link.expiresAt) {
      return res
        .status(403)
        .json({ message: "Link is not visible or expired" });
    }

    const user = await UserModel.findById(link.userId)
      .select("username")
      .lean();
    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const contents = await ContentModel.find({ userId: link.userId })
      .populate("tags")
      .lean();
    // console.log(contents);
    if (contents.length === 0) {
      return res.status(200).json({
        message: "No content found",
        username: user.username,
        contents: [],
      });
    }

    return res.status(200).json({
      username: user.username,
      contents,
    });
  } catch (error) {
    console.error("Error fetching shared brain:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
