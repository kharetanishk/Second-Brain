import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../Models/Usermodel";
import bcrypt from "bcrypt";
import { loginSchema, signupSchema } from "../Validations/auth.validation";

const jsonKey = process.env.JWT_SECRET as string;

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const parseD = signupSchema.safeParse(req.body);
    // console.log(parseD);
    if (!parseD.success) {
      return res.json({
        message: "INVALID INPUT",
        errors: parseD.error.flatten().fieldErrors,
      });
    }

    const { username, email, password } = {
      username: parseD.data.username.trim(),
      email: parseD.data.email.trim().toLowerCase(),
      password: parseD.data.password.trim(),
    };

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === email
            ? "Email already in use"
            : "Username already taken ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: newUser._id.toString(),
      },
      jsonKey,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User registered & logged in successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//loginfucntion

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        message: "Invalid email or password",
        error: parse.error.flatten().fieldErrors,
      });
    }

    const { email, password } = {
      email: parse.data.email.trim().toLowerCase(),
      password: parse.data.password.trim(),
    };

    const user = await UserModel.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      jsonKey,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//logout
export const logoutUser = (req: Request, res: Response): Response => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
