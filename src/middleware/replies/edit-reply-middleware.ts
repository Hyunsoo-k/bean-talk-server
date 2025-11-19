import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const editReplyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const { category, post_id, comment_id, reply_id } = req.params;
  
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

  const reply = comment.replies.id(reply_id);
  if (!reply) {
    throw new HttpError(404, "답글을 찾을 수 없습니다.");
  } else if (!reply.author.equals(user_id)) {
    throw new HttpError(403, "권한이 없습니다.");
  }

  const { content } = req.body;

  reply.content = content;
  
  await commentContainer.save();

  next();
};

export default editReplyMiddleware;
