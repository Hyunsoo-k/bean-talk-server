import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/index.js";
import { POST_MODELS } from "../../variables/index.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer, NotificationContainer } from "../../mongoose-models/index.js";

const createComment = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    category,
    post_id
  } = req.params as {
    category: Category,
    post_id: string,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newComment_id = new mongoose.Types.ObjectId();

    const { content } = req.body;

    const commentContainerUpdateResult = await CommentContainer.updateOne(
      {
        post_id,
      },
      {
        $push: {
          comments: {
            _id: newComment_id,
            author: user_id,
            content,
          },
        },
      },
      {
        session,
      }
    );
    if (commentContainerUpdateResult.matchedCount === 0) {
      throw new HttpError(404, "댓글 컨테이너를 찾을 수 없습니다.");
    } else if (commentContainerUpdateResult.modifiedCount === 0) {
      throw new HttpError(500, "댓글 컨테이너 수정을 실패하였습니다.");
    }

    const updatedPost = await POST_MODELS[category].findOneAndUpdate(
      {
        _id: post_id,
      },
      {
        $inc: {
          commentCount: 1,
        },
      },
      {
        new: true,
        session,
      }
    );
    if (!updatedPost) {
      throw new HttpError(404, "게시글을 찾을 수 없습니다.");
    }
    
    const notificationContainerUpdateResult = await NotificationContainer.updateOne(
      {
        user_id: updatedPost.author,
      },
      {
        $push: {
          notifications: {
            targetUrl: `/categories/${category}/posts/${post_id}?element_id=${newComment_id}`,
            targetTitle: updatedPost.title,
            triggeredBy: user_id,
            type: "댓글",
          }
        }
      },
      {
        session,
      }
    );
    if (notificationContainerUpdateResult.matchedCount === 0) {
      throw new HttpError(404, "알림 컨테이너를 찾을 수 없습니다.");
    } else if (notificationContainerUpdateResult.modifiedCount === 0) {
      throw new HttpError(500, "알림 컨테이너 수정을 실패하였습니다.");
    }

    await session.commitTransaction();

    res.status(201).json();
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }
};

export default createComment;