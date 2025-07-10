import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);

export default authRoutes;
