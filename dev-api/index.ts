import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "../src/routers/auth-router.js";
import usersRouter from "../src/routers/users-router.js";
import bbsRouter from "../src/routers/bbs-router.js";
import globalErrorHandler from "../src/error-handler/global-error-handler.js";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL!, { autoIndex: false })
  .then(() => { console.log("connected to mongoDb"); })
  .catch((err: Error) => { console.log("Error connecting to MongoDB", err); });

const app = express();
app.use(cors({
  origin: [process.env.SERVER_DEVELOP_URL!, process.env.FRONT_END_DEVELOP_URL!],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/bbs", bbsRouter);
app.use(globalErrorHandler);

app.listen(3000, () => { console.log("server on"); });

export default app;
