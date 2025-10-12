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

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!, { autoIndex: false });
    console.log("Connected to MongoDB");

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

    app.use("/auth", authRouter);
    app.use("/users", usersRouter);
    app.use("/bbs", bbsRouter);
    app.use(globalErrorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startServer();

export default startServer;