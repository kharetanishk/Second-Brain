import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { getMyUser } from "../Controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/me", verifyUserMiddleware, getMyUser);

export default userRoutes;
