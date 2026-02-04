import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { Reply } from "../../types/reply.js";
import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import { CommentContainer, NotificationContainer } from "../../mongoose-models/index.js";

const createReplyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const { category, post_id, comment_id } = req.params;
  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  }

  const commentContainer = await CommentContainer.findOne({ post_id });
  if (!commentContainer) {
    throw new HttpError(404, "댓글 컨테이너를 찾을 수 없습니다.");
  }

  const comment = commentContainer.comments.id(comment_id);
  if (!comment) {
    throw new HttpError(404, "댓글을 찾을 수 없습니다.");
  }

  const { content } = req.body;
  const newReply_id = new mongoose.Types.ObjectId();

  comment.replies.push({
    _id: newReply_id,
    author: user_id,
    content,
  });

  const createdReply = comment.replies.id(newReply_id);
  if (!createdReply) {
    throw new HttpError(500, "답글 생성을 실패하였습니다.");
  }
  post.commentCount += 1;

  const recipients: mongoose.Types.ObjectId[] = [];

  if (!post.author.equals(user_id)) {
    recipients.push(post.author);
  }

  if (
    !post.author.equals(user_id) &&
    !comment.author.equals(user_id)
  ) {
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
        { user_id: recipient },
        {
          $push: {
            list: {
              targetUrl: `/categories/${category}/posts/${post_id}?element_id=${createdReply._id}`,
              targetTitle: post.title,
              triggeredBy: user_id,
              type: "답글",
            },
          },
        }
      )
    )
  );

  await post.save();
  await commentContainer.save();

  next();
};

export default createReplyMiddleware;
