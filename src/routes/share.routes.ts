import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { shareBrain } from "../Controllers/share.controller";

const shareRoutes = Router();

shareRoutes.post("/brain/share", verifyUserMiddleware, shareBrain);

export default shareRoutes;
