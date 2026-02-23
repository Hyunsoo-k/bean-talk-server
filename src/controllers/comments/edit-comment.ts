import type { Request, Response } from "express";

import type { Category } from "../../types/index.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const editComment = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    post_id,
    comment_id
  } = req.params as {
    category: Category,
    post_id: string,
    comment_id: string,
  };

  const { content } = req.body;

  const commentContainerUpdateResult = await CommentContainer.updateOne(
    {
      post_id,
      comments: {
        $elemMatch: {
          _id: comment_id,
          author: user_id,
        },
      },
    },
    {
      $set: {
        "comments.$.content": content,
        "comments.$.isEdited": true,
      }
    },
  );
  if (commentContainerUpdateResult.matchedCount === 0) {
    throw new HttpError(404, "댓글을 찾을 수 없거나 수정 권한이 없습니다.")
  }

  res.status(201).json();
};

export default editComment;