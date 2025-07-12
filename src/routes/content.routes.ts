import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { createContent } from "../Controllers/content.controller";
import { getUserContent } from "../Controllers/content.controller";
import { deleteContent } from "../Controllers/content.controller";
import { updateContent } from "../Controllers/content.controller";

const contentRoutes = Router();

contentRoutes.post("/content", verifyUserMiddleware, createContent);
contentRoutes.get("/content", verifyUserMiddleware, getUserContent);
contentRoutes.delete("/content/:id", verifyUserMiddleware, deleteContent);
contentRoutes.put("/content/:id", verifyUserMiddleware, updateContent);

export default contentRoutes;
