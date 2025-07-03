import express from "express";
import mongoose from "mongoose";

const app = express();

//routes

app.post("/api/v1/signup", (req, res) => {});

app.post("api/v1/signin", (req, res) => {});

app.post("api/v1/content", (req, res) => {});

app.get("/api/v1/contentt", (req, res) => {});

app.delete("api/v1/content", (req, res) => {});

app.post("api/v1/brain/share", (req, res) => {});

app.get("api/v1/brain/:shareLink", (req, res) => {});
