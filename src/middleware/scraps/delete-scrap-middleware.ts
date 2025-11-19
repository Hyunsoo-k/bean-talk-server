import { NextFunction, Request, Response } from "express";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import HttpError from "../../error/http-error.js";
import postModelMap from "../../variables/post-model-map.js";
import mongoose from "mongoose";

const deleteScrapMiddleware = async (
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
  }

  const isExists = post.scraps.some(
    (userWhoScraped: mongoose.Types.ObjectId) => userWhoScraped.equals(user_id)
  );
  if (!isExists) {
    throw new HttpError(409, "스크랩을 한 상태가 아닙니다.");
  }

  post.scraps.pull(user_id);

  await post.save();

  next();
};

export default deleteScrapMiddleware;