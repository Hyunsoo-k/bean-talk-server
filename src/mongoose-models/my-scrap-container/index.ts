import mongoose from "mongoose";

import JobPostSchema from "../job-post/index.js";
import NewsPostSchema from "../news-post/index.js";
import NoticePostSchema from "../notice-post/index.js";
import PromotionPostSchema from "../promotion-post/index.js";
import ThreadPostSchema from "../thread-post/index.js";

const MyScrapContainerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    posts: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    }
  }
);

export default MyScrapContainerSchema;