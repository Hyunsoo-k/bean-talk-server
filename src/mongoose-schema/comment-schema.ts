import mongoose from "mongoose";

import ReplySchema from "./reply-schema.js";

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000,
    },
    replies: {
      type: [ReplySchema],
      default: [],
    },
    deletedHavingReply: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default CommentSchema;
