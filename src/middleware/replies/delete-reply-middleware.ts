import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";

const deleteReplyMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(req, next);

  const { category, post_id, comment_id, reply_id } = req.params;
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

  const reply = comment.replies.id(reply_id);
  if (!reply) {
    return customHttpErrorHandler("답글을 찾을 수 없습니다", 404, next);
  } else if (!reply.author.equals(user_id)) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  comment.replies.pull(reply_id);

  if (comment.replies.length === 0 && comment.deletedHavingReply) {
    post.comments.pull(comment_id);
  }

  await post.save();

  next();
};

export default deleteReplyMiddleware;
