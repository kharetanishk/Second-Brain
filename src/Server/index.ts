import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "../Database/db";
import cookieParser from "cookie-parser";
import authRoutes from "../routes/auth.routes";
import userRouter from "../routes/user.routes";

const app = express();
const port = 1601;

app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRouter);

connectDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
