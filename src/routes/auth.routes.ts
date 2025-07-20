import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../Controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);

export default authRoutes;
