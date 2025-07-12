import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { createTag } from "../Controllers/tag.controller";

const tagRoutes = Router();

tagRoutes.post("/tags", verifyUserMiddleware, createTag);

export default tagRoutes;
