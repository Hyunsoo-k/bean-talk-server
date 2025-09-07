import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL as string, { autoIndex: false })
  .then((): void => { console.log('connected to mongoDb'); })
  .catch((err: Error): void => { console.log('Error connecting to MongoDB', err); });

const app = express();
app.use(cors({
  origin: [
    process.env.SERVER_DEVELOP_URL as string,
    process.env.FRONT_END_DEVELOP_URL as string,
    process.env.FRONT_END_PRODUCTION_URL as string
  ]
}));