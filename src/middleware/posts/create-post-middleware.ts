import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import verifyAccessToken from "../../utils/verify-access-token.js";

const createPostMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(accessToken);
  
  const { category } = req.params;
  if (!isValidCategory(category)) {
    return customHttpErrorHandler("잘못된 카테고리 입니다.", 400, next);
  }

  await postModelMap[category].create({ author: user_id, ...req.body });

  next();
};

export default createPostMiddleware;
