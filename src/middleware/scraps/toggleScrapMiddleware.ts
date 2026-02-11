import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import HttpError from "../../error/http-error.js";
import postModelMap from "../../variables/post-model-map.js";
import { MyScrapContainer } from "../../mongoose-models/index.js";

const toggleScrapMiddleware = async (
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

  const isScrapped = post.scraps.some(
    (userWhoScraped: mongoose.Types.ObjectId) => userWhoScraped.equals(user_id)
  );

  const myScrapContainer = await MyScrapContainer.findOne({ user_id });
  if (!myScrapContainer) {
    throw new HttpError(404, "스크랩 컨테이너를 찾을 수 없습니다.");
  }

  if (isScrapped) {
    post.scraps.pull(user_id);
    myScrapContainer.posts = myScrapContainer.posts.filter(
      (scrapPost: any) => scrapPost._id.toString() !== post_id
    );
    
    await Promise.all([
      post.save(),
      myScrapContainer.save()
    ]);
  } else if (!isScrapped) {
    post.scraps.push(user_id);
    myScrapContainer.posts.push(post);
    
    await Promise.all([
      post.save(),
      myScrapContainer.save()
    ]);
  }

  next();
};

export default toggleScrapMiddleware;