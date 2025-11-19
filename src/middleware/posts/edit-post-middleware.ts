import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";

const editPostMiddleware = async (
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
    throw new HttpError(403, "권한이 없습니다.");
  }

  const { title, content } = req.body;
  if (!title || !content) {
    throw new HttpError(400, "제목과 내용은 필수 입니다.");
  }

  post.title = title;
  post.content = content;
  
  await post.save();

  res.locals.editedPost = post;

  next();
};

export default editPostMiddleware;
