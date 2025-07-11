import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { createTag } from "../Controllers/tag.controller";

const tagroutes = Router();

tagroutes.post("/tags", verifyUserMiddleware, createTag);

export default tagroutes;
