import mongoose from "mongoose";

import CommentSchema from "../mongoose-schema/comment-schema.js";

const { Schema } = mongoose;

const ThreadPostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    scraps: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000000,
      trim: true,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const PromotionPostSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["카페", "납품"],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    scraps: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000000,
      trim: true,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const JobPostSchema = new Schema(
  {
    subCategory: {
      type: String,
      enum: ["구인", "구직"],
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    scraps: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000000,
      trim: true,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const NewsPostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    scraps: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000000,
      trim: true,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const NoticePostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    scraps: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000000,
      trim: true,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export { 
  ThreadPostSchema,
  PromotionPostSchema,
  JobPostSchema,
  NewsPostSchema,
  NoticePostSchema
};