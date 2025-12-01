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

const startServer = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URL!, { autoIndex: false })
      .then(() => { console.log("Connected to MongoDB"); });

    const app = express();

    app.use(cors({
      origin: [
        process.env.SERVER_DEVELOP_URL!,
        process.env.FRONT_END_DEVELOP_URL!
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
    app.use("/users", usersRouter);
    app.use(globalErrorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

startServer();

export default startServer;
