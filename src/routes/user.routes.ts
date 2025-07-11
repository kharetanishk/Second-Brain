import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { getMyUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/me", verifyUserMiddleware, getMyUser);

export default userRoutes;
