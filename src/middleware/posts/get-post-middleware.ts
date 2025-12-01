import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import HttpError from "../../error/http-error.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";

const getPostMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { category, post_id } = req.params;
  
  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리입니다.");
  }

  const post = await postModelMap[category]
    .findByIdAndUpdate(
      new mongoose.Types.ObjectId(post_id),
      {
        $inc: { views: 1 }
      },
      { new: true }
    )
    .populate({
      path: "author",
      select: "nickname profileImageUrl"
    })
    .lean();

  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  }

  res.locals.post = post;
  
  next();
};

export default getPostMiddleware;