import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";

const deletePostMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(accessToken);

  const { category, post_id } = req.params;
  if (!isValidCategory(category)) {
    return customHttpErrorHandler("잘못된 카테고리 입니다.", 400, next);
  }

  const post = await postModelMap[category].exists({ _id: post_id });

  if (!post) {
    return customHttpErrorHandler("게시글을 찾을 수 없습니다.", 404, next);
  } else if (!post.author.equals(user_id)) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  await postModelMap[category].findByIdAndDelete(post_id);

  next();
};

export default deletePostMiddleware;
