import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const deletePostMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const { category, post_id } = req.params;

  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  } else if (!post.author.equals(user_id)) {
    throw new HttpError(401, "권한이 없습니다.");
  }

  await post.deleteOne();
  
  const deletedCommentContainer =
    await CommentContainer.findOneAndDelete({ post_id });
  if (!deletedCommentContainer) {
    throw new HttpError(404, "댓글을 찾을 수 없습니다.");
  }

  next();
};

export default deletePostMiddleware;
