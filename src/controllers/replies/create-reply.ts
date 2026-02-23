import type { Request, Response } from "express";
import mongoose from "mongoose";

import {
  Category,
  Comment,
  Reply
} from "../../types/index.js";
import POST_MODELS from "../../variables/post-models.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer, NotificationContainer } from "../../mongoose-models/index.js";

const createReply = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.payload!;

  const {
    category,
    post_id,
    comment_id
  } = req.params as {
    category: Category,
    post_id: string,
    comment_id: string
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedPost = await POST_MODELS[category].findByIdAndUpdate(
      post_id,
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

    const { content } = req.body;

    const newReply_id = new mongoose.Types.ObjectId();

    const updatedCommentContainer = await CommentContainer.findOneAndUpdate(
      {
        post_id,
        "comments._id": comment_id,
      },
      {
        $push: {
          "comments.$.replies": {
            _id: newReply_id,
            author: user_id,
            content,
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

    const recipients: mongoose.Types.ObjectId[] = [];

    if (!updatedPost.author.equals(user_id)) {
      recipients.push(updatedPost.author);
    }

    const comment = updatedCommentContainer.comments.find(
      (comment: Comment) => comment._id.equals(comment_id)
    );
    if (!comment) {
      throw new HttpError(404, "댓글을 찾을 수 없습니다.");
    }

    if (!updatedPost.author.equals(user_id) && !comment.author.equals(user_id)) {
      recipients.push(comment.author);
    }

    comment.replies.forEach((reply: Reply): void => {
      const isExists = recipients.some(
        (recipient: mongoose.Types.ObjectId) => recipient.equals(reply.author)
      );
      if (!isExists && !reply.author.equals(user_id)) {
        recipients.push(reply.author);
      }
    });

    await Promise.all(
      recipients.map((recipient) =>
        NotificationContainer.findOneAndUpdate(
          {
            user_id: recipient,
          },
          {
            $push: {
              notifications: {
                targetUrl: `/categories/${category}/posts/${post_id}?element_id=${newReply_id}`,
                targetTitle: updatedPost.title,
                triggeredBy: user_id,
                type: "답글",
              },
            },
          },
          {
            session,
          }
        )
      )
    );

    await session.commitTransaction();

    res.status(201).json();
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
};

export default createReply;