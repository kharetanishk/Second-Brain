import { Response } from "express";
import { AuthReq } from "../Middleware/verifytoken";
import { LinkModel } from "../Models/Linkmodel";
import crypto from "crypto";

// 7 days in milliseconds
const EXPIRY_DURATION = 7 * 24 * 60 * 60 * 1000;

export const shareBrain = async (req: AuthReq, res: Response) => {
  try {
    const { share } = req.body;

    if (typeof share !== "boolean") {
      return res.status(400).json({ message: "Invalid share value" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: No userId" });
    }

    console.log(`[SHARE BRAIN] userId=${req.userId}, share=${share}`);

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
