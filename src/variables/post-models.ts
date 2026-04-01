import type { Model } from "mongoose";

import {
  News,
  Notice,
  Thread,
  Job,
  Promotion,
  Essay
} from "../mongoose-models/index.js";

type Category = "news" | "notice" | "thread" | "promotion" | "job" | "essay";

const POST_MODELS: Record<Category, Model<any, any, any>> = {
  "news": News,
  "notice": Notice,
  "thread": Thread,
  "job": Job,
  "promotion": Promotion,
  "essay": Essay
};

export default POST_MODELS;
