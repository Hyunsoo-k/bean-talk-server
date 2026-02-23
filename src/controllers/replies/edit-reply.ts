import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/category.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const editReply = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.payload!

  const {
    post_id,
    comment_id,
    reply_id
  } = req.params as {
    category: Category,
    post_id: string,
    comment_id: string,
    reply_id: string
  };

  const { content } = req.body;

  const updatedCommentContainer = await CommentContainer.findOneAndUpdate(
    {
      post_id,
      "comments._id": comment_id,
    },
    {
      $set: {
        "comments.$[comment].replies.$[reply].content": content,
      },
    },
    {
      arrayFilters: [
        {
          "comment._id": new mongoose.Types.ObjectId(comment_id),
        },
        {
          "reply._id": new mongoose.Types.ObjectId(reply_id),
          "reply.author": new mongoose.Types.ObjectId(user_id),
        },
      ],
      new: true,
    }
  );
  if (!updatedCommentContainer) {
  throw new HttpError(403, "권한이 없거나 답글을 찾을 수 없습니다.");
}

  res.status(200).json();
};

export default editReply;