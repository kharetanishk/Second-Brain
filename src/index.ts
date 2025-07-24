import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./Database/db";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.routes";
import contentRoutes from "./Routes/content.routes";
import userRoutes from "./Routes/user.routes";
import tagRoutes from "./Routes/tag.routes";
import shareRoutes from "./Routes/share.routes";
import type {Request, Response} from "express";

const port = 1602;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", contentRoutes);
app.use("/api", tagRoutes);
app.use("/api", shareRoutes);

connectDB();

app.get("/health-check", (req: Request, res:Response) => {
  res.send("success!")
})

app.listen(port, "0.0.0.0", () => {
  console.log(`http://localhost:${port}`);
});
