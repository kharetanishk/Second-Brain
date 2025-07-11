import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { createContent } from "../Controllers/content.controller";

const contentRoutes = Router();

contentRoutes.post("/content", verifyUserMiddleware, createContent);

export default contentRoutes;
