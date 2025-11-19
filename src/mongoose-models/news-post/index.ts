import mongoose from "mongoose";

const NewsPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
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
    commentCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    scraps: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default NewsPostSchema;