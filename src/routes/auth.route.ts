import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);

export default authRoutes;
