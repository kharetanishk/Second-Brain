import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "../Database/db";

const app = express();
const port = 1601;

app.use(express.json());

connectDB();

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
