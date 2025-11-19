import type { Model } from "mongoose";

import {
  NewsPost,
  NoticePost,
  ThreadPost,
  JobPost,
  PromotionPost
} from "../mongoose-models/index.js";

type PostCategory = "news" | "notice" | "thread" | "promotion" | "job";

type AnyModel = Model<any, any, any>;

const postModelMap: Record<PostCategory, AnyModel> = {
  "news": NewsPost,
  "notice": NoticePost,
  "thread": ThreadPost,
  "job": JobPost,
  "promotion": PromotionPost
};

export default postModelMap;
