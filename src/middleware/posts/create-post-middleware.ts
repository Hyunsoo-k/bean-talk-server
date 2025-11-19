import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import isValidCategory from "../../utils/is-valid-category.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import postModelMap from "../../variables/post-model-map.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const createPostMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const { category } = req.params;

  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const newPost = await postModelMap[category].create(
    {
      author: user_id,
      ...req.body,
    }
  );
  
  const newCommentContainer = await CommentContainer.create({ post_id: newPost._id });
  if (!newCommentContainer) {
    throw new HttpError(500, "댓글 컨테이너 생성을 실퍃였습니다.");
  }

  res.locals.newPost = newPost;

  next();
};

export default createPostMiddleware;
