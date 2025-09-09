import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "../src/routes/auth/index.js";
import userRouter from "../src/routes/user/index.js";
import globalErrorHandler from "../src/error-handler/global-error-handler.js";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL!, { autoIndex: false })
  .then(() => { console.log("connected to mongoDb"); })
  .catch((err: Error) => { console.log("Error connecting to MongoDB", err); });

const app = express();
app.use(
  cors({
    origin: [
      process.env.SERVER_DEVELOP_URL!,
      process.env.FRONT_END_DEVELOP_URL!
    ],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use(globalErrorHandler);

export default app;
