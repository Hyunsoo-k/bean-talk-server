import { type Model } from "mongoose";

import {
  ThreadPost,
  PromotionPost,
  JobPost,
  NewsPost,
  NoticePost
} from "../mongoose-model/post-model.js";

type PostCategory = "thread" | "promotion" | "job" | "news" | "notice";

type AnyModel = Model<any, any, any>;
/**
 * url 동적 param을 key로
 */
const postModelMap: Record<PostCategory, AnyModel> = {
  thread: ThreadPost,
  promotion: PromotionPost,
  job: JobPost,
  news: NewsPost,
  notice: NoticePost,
};

export default postModelMap;
