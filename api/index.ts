import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
  authRouter,
  usersRouter,
  postsRouter,
  commentsRouter,
  repliesRouter,
  integratedSearchRouter,
  localsSearchRouter
} from "../src/routers/index.js";

import globalErrorHandler from "../src/error-handler/global-error-handler.js";

const app = express();
app.use(cors({
  origin: (origin, callback) => {  
    const whitelist = [
      process.env.CLIENT_DEVELOPMENT_URL,
      process.env.CLIENT_DEPLOYMENT_URL
    ];

    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS Rejected for origin:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/categories/:category/posts/:post_id/comments/:comment_id/replies", repliesRouter);
app.use("/categories/:category/posts/:post_id/comments", commentsRouter);
app.use("/categories/:category/posts", postsRouter);
app.use("/integrated-search", integratedSearchRouter);
app.use("/locals", localsSearchRouter);
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
