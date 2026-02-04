import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "../src/routers/auth-router.js";
import usersRouter from "../src/routers/users-router.js";
import postsRouter from "../src/routers/posts-router.js";
import commentsRouter from "../src/routers/comments-router.js";
import repliesRouter from "../src/routers/replies.router.js";

import globalErrorHandler from "../src/error-handler/global-error-handler.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    process.env.SERVER_DEVELOP_URL!,
    process.env.FRONT_END_DEVELOP_URL!,
  ],
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/categories/:category/posts/:post_id/comments/:comment_id/replies", repliesRouter);
app.use("/categories/:category/posts/:post_id/comments", commentsRouter);
app.use("/categories/:category/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/me", usersRouter);
app.use(globalErrorHandler);

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL!, { autoIndex: false });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  await connectToDatabase();
  
  return app(req, res);
};

export default handler;
