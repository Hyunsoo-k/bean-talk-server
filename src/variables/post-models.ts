import type { Model } from "mongoose";

import {
  News,
  Notice,
  Thread,
  Job,
  Promotion
} from "../mongoose-models/index.js";

type PostCategory = "news" | "notice" | "thread" | "promotion" | "job";

const POST_MODELS: Record<PostCategory, Model<any, any, any>> = {
  "news": News,
  "notice": Notice,
  "thread": Thread,
  "job": Job,
  "promotion": Promotion
};

export default POST_MODELS;
