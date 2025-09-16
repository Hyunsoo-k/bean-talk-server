import mongoose from "mongoose";

import {
  ThreadPostSchema,
  PromotionPostSchema,
  JobPostSchema,
  NewsPostSchema,
  NoticePostSchema,
} from "../mongoose-schema/post-schema.js";

const { model } = mongoose;
const ThreadPost = model("Thread", ThreadPostSchema);
const PromotionPost = model("PromotionPost", PromotionPostSchema);
const JobPost = model("JobPost", JobPostSchema);
const NewsPost = model("NewsPost", NewsPostSchema);
const NoticePost = model("NoticePost", NoticePostSchema);

export { ThreadPost, PromotionPost, JobPost, NewsPost, NoticePost };
