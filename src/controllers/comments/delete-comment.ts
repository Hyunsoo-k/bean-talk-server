import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/index.js";
import POST_MODELS from "../../variables/post-models.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const deleteComment = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const { category, post_id, comment_id } = req.params as {
    category: Category;
    post_id: string;
    comment_id: string;
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const commentContainer = await CommentContainer.findOne(
      {
        post_id,
        "comments._id": comment_id,
      },
      {
        "comments.$": 1,
      },
      {
        session,
      }
    );

    if (!commentContainer || !commentContainer.comments[0]) {
      throw new HttpError(404, "댓글을 찾을 수 없습니다.");
    }

    const targetComment = commentContainer.comments[0];

    if (targetComment.author.toString() !== user_id) {
      throw new HttpError(403, "삭제 권한이 없습니다.");
    }

    if (targetComment.replies && targetComment.replies.length > 0) {
      await CommentContainer.updateOne(
        {
          "comments._id": comment_id,
        },
        {
          $set: {
            "comments.$.deletedHavingReply": true,
          }
        },
        {
          session,
        }
      );
    } else {
      await CommentContainer.updateOne(
        {
          post_id,
        },
        {
          $pull: {
            comments: {
              _id: comment_id,
            },
          },
        },
        {
          session,
        }
      );
    }

    const postUpdateResult = await POST_MODELS[category].updateOne(
      {
        _id: post_id,
      },
      {
        $inc: {
          commentCount: -1,
        }
      },
      {
        session,
      }
    );

    if (postUpdateResult.matchedCount === 0) {
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

export default deleteComment;