import { NextFunction, Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import verifyAccessToken from "../../utils/verify-access-token.js";

const createPostMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const { category } = req.params;
  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  await postModelMap[category].create({ author: user_id, ...req.body });

  next();
};

export default createPostMiddleware;
