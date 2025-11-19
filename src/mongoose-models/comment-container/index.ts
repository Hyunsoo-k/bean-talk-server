import mongoose from "mongoose";

import CommentSchema from "./comment.js";

const CommentContainerSchema = new mongoose.Schema(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

export default CommentContainerSchema;
