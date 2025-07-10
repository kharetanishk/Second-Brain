import { Request, Response } from "express";
import { UserModel } from "../Database/db";
import bcrypt from "bcrypt";
import { signupSchema } from "../validations/auth.validation";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const parseD = signupSchema.safeParse(req.body);
    console.log(parseD);
    if (!parseD.success) {
      return res.json({
        message: "INVALID INPUT",
        errors: parseD.error.flatten().fieldErrors,
      });
    }

    const { username, email, password } = parseD.data;

    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      return res.status(409).json({
        message: "EMAIL ALREADY IN USE",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "USER REGISTERED SUCCESSFULLY" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
