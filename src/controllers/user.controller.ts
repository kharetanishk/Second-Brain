import { Response } from "express";
import { UserModel } from "../Database/db";
import { AuthReq } from "../Middleware/verifytoken";

export const getMyUser = async (req: AuthReq, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId).select(
      "_id username email"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in GET /api/me:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};
