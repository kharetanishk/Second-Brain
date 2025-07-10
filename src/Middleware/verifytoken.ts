import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const jsonKey = process.env.JWT_SECRET as string;

interface AuthReq extends Request {
  userId?: string;
}

export const verifyUserMiddleware = (
  req: AuthReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, jsonKey) as JwtPayload;

    // Confirm decoded token is an object and contains userId....
    if (decoded && typeof decoded === "object" && "userId" in decoded) {
      req.userId = decoded.userId;
      return next();
    }

    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token payload" });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};
