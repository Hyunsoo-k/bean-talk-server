import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/index.js";
import HttpError from "../../error/http-error.js";
import POST_MODELS from "../../variables/post-models.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const deleteReply = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    category,
    post_id,
    comment_id,
    reply_id
  } = req.params as {
    category: Category,
    post_id: string,
    comment_id: string,
    reply_id: string
  };

  const session = await mongoose.startSession();

  try {
    const updatedCommentContainer = await CommentContainer.findOneAndUpdate(
      {
        post_id,
        "comments._id": comment_id,
      },
      {
        $pull: {
          "comments.$.replies": {
            _id: new mongoose.Types.ObjectId(reply_id),
            author: new mongoose.Types.ObjectId(user_id),
          },
        },
      },
      {
        new: true,
        session,
      }
    );
    if (!updatedCommentContainer) {
      throw new HttpError(404, "댓글 컨테이너를 찾을 수 없습니다.");
    }

    const updatedPost = await POST_MODELS[category].findByIdAndUpdate(
      post_id,
      {
        $inc: {
          commentCount: -1,
        }
      },
      {
        new: true,
        session,
      }
    );
    if (!updatedPost) {
      throw new HttpError(404, "게시글을 찾을 수 없습니다.");
    }

    await session.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
};

export default deleteReply;