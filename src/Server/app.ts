import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "../Database/db";
import cookieParser from "cookie-parser";
import authRoutes from "../Routes/auth.routes";
import contentRoutes from "../Routes/content.routes";
import userRoutes from "../Routes/user.routes";
import tagroutes from "../Routes/tag.routes";

const app = express();
const port = 1601;

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", contentRoutes);
app.use("/api", tagroutes);

connectDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
