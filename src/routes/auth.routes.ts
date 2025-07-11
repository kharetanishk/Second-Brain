import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);

export default authRoutes;
