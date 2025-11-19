import mongoose from "mongoose";

import UserSchema from "./user/index.js";
import NotificationContainerSchema from "./notification-container/index.js";
import NewsPostSchema from "./news-post/index.js";
import NoticePostSchema from "./notice-post/index.js";
import ThreadPostSchema from "./thread-post/index.js";
import JobPostSchema from "./job-post/index.js";
import PromotionPostSchema from "./promotion-post/index.js";
import CommentContainerSchema from "./comment-container/index.js";

const User = mongoose.model("User", UserSchema);
const NotificationContainer = mongoose.model("NotificationContainer", NotificationContainerSchema);
const NewsPost = mongoose.model("NewsPost", NewsPostSchema);
const NoticePost = mongoose.model("NoticePost", NoticePostSchema);
const ThreadPost = mongoose.model("ThreadPost", ThreadPostSchema);
const JobPost = mongoose.model("JobPost", JobPostSchema);
const PromotionPost = mongoose.model("PromotionPost", PromotionPostSchema);
const CommentContainer = mongoose.model("CommentContainer", CommentContainerSchema);

export {
  User,
  NotificationContainer,
  NewsPost,
  NoticePost,
  ThreadPost,
  JobPost,
  PromotionPost,
  CommentContainer
};