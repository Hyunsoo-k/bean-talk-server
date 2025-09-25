import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import NotificationModel from "../../mongoose-model/notification-model.js";

const createReplyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(req, next);

  const { category, post_id, comment_id } = req.params;
  if (!isValidCategory(category)) {
    return customHttpErrorHandler("잘못된 카테고리 입니다.", 400, next);
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    return customHttpErrorHandler("게시글을 찾을 수 없습니다.", 404, next);
  }

  const comment = post.comments.id(comment_id);
  if (!comment) {
    return customHttpErrorHandler("댓글을 찾을 수 없습니다", 404, next);
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

  await Promise.all(recipients.map(recipient =>
    NotificationModel.findOneAndUpdate(
      { user_id: recipient },
      { $push: { list: {
        targetUrl: `/bbs/categories/${category}/posts/${post_id}?element_id=${newReply._id}`,
        targetTitle: post.title,
        triggeredBy: user_id,
        type: "답글"
      }}}
    )
  ));

  await post.save();

  next();
};

export default createReplyMiddleware;
