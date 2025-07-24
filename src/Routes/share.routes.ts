import { Router } from "express";
import { verifyUserMiddleware } from "../Middleware/verifytoken";
import { shareBrain, getSharedBrain } from "../Controllers/share.controller";

const shareRoutes = Router();

shareRoutes.post("/brain/share", verifyUserMiddleware, shareBrain);
shareRoutes.get("/brain/:hash", getSharedBrain);
// console.log("shareRoutes loaded");

export default shareRoutes;
