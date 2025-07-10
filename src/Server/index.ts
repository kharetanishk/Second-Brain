import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "../Database/db";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.route";

const app = express();
const port = 1601;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

connectDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
