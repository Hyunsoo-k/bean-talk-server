import mongoose from "mongoose";
import dotenv from "dotenv";

import PostModel from "../src/model/post";

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL as string, { autoIndex: false })
  .then((): void => { console.log('connected to mongoDb'); })
  .catch((err: Error): void => { console.log('Error connecting to MongoDB', err); });

const updateFieldName = async () => {
  await PostModel
    .deleteMany({})
};

updateFieldName();