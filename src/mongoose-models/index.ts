import mongoose from "mongoose";

import {
  UserSchema,
  JobSchema,
  NewsSchema,
  NoticeSchema,
  PromotionSchema,
  ThreadSchema,
  CommentContainerSchema,
  MyPostContainerSchema,
  MyScrapContainerSchema,
  NotificationContainerSchema,
} from "./schemas/index.js";

const User = mongoose.model("User", UserSchema);
const News = mongoose.model("News", NewsSchema);
const Notice = mongoose.model("Notice", NoticeSchema);
const Thread = mongoose.model("Thread", ThreadSchema);
const Job = mongoose.model("Job", JobSchema);
const Promotion = mongoose.model("Promotion", PromotionSchema);
const CommentContainer = mongoose.model("CommentContainer", CommentContainerSchema);
const MyPostContainer = mongoose.model("MyPostContainer", MyPostContainerSchema);
const MyScrapContainer = mongoose.model("MyScrapContainer", MyScrapContainerSchema);
const NotificationContainer = mongoose.model("NotificationContainer", NotificationContainerSchema);

export {
  User,
  News,
  Notice,
  Thread,
  Job,
  Promotion,
  CommentContainer,
  MyPostContainer,
  MyScrapContainer,
  NotificationContainer
};