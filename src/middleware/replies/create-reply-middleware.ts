import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import NotificationModel from "../../mongoose-model/notification-model.js";

const createReplyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const { category, post_id, comment_id } = req.params;
  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  }

  const comment = post.comments.id(comment_id);
  if (!comment) {
    throw new HttpError(404, "댓글을 찾을 수 없습니다");
  }

  const { content } = req.body;
  comment.replies.push({ content, author: user_id });
  const newReply = comment.replies[comment.replies.length - 1];

  const recipients = [post.author];
  if (!post.author.equals(comment.author)) {
    recipients.push(comment.author);
  }
  comment.replies.forEach((reply: any) => {
    if (!recipients.some((recipient: any) => recipient.equals(reply.author))) {
      recipients.push(reply.author);
    }
  });

  await Promise.all(
    recipients.map((recipient) =>
      NotificationModel.findOneAndUpdate(
        { user_id: recipient },
        {
          $push: {
            list: {
              targetUrl: `/bbs/categories/${category}/posts/${post_id}?element_id=${newReply._id}`,
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

  next();
};

export default createReplyMiddleware;
