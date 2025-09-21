import mongoose from "mongoose";

import {
  ThreadPostSchema,
  PromotionPostSchema,
  JobPostSchema,
  NewsPostSchema,
  NoticePostSchema,
} from "../mongoose-schema/post-schema.js";

const ThreadPost = mongoose.model("Thread", ThreadPostSchema);
const PromotionPost = mongoose.model("PromotionPost", PromotionPostSchema);
const JobPost = mongoose.model("JobPost", JobPostSchema);
const NewsPost = mongoose.model("NewsPost", NewsPostSchema);
const NoticePost = mongoose.model("NoticePost", NoticePostSchema);

export { ThreadPost, PromotionPost, JobPost, NewsPost, NoticePost };
