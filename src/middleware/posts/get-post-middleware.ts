import { NextFunction, Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";

const getPostMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { category, post_id } = req.params;
  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  await postModelMap[category].updateOne({ _id: post_id }, { $inc: { views: 1 } });

  const post = await postModelMap[category]
    .findById(post_id)
    .populate({ path: "author", select: "_id nickname" })
    .populate({ path: "comments.author", select: "_id nickname profileImageUrl" })
    .populate({ path: "comments.replies.author", select: "_id nickname profileImageUrl" })
    .lean();
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  }

  res.locals.post = post;
  next();
};

export default getPostMiddleware;
