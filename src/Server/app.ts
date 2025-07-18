import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "../Database/db";
import cookieParser from "cookie-parser";
import authRoutes from "../Routes/auth.routes";
import contentRoutes from "../Routes/content.routes";
import userRoutes from "../Routes/user.routes";
import tagRoutes from "../Routes/tag.routes";
import shareRoutes from "../Routes/share.routes";

const app = express();
const port = 1601;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // or whatever your frontend port is
    credentials: true,
  })
);
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", contentRoutes);
app.use("/api", tagRoutes);
app.use("/api", shareRoutes);

connectDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
