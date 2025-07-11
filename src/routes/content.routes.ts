import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { createContent } from "../Controllers/content.controller";
import { getUserContent } from "../Controllers/content.controller";

const contentRoutes = Router();

contentRoutes.post("/content", verifyUserMiddleware, createContent);
contentRoutes.get("/content", verifyUserMiddleware, getUserContent);

export default contentRoutes;
