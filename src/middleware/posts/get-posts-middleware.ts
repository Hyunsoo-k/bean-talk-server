import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import HttpError from "../../error/http-error.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import optimizeBbs from "../../utils/optimize-bbs.js";

const getPostsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { category } = req.params;
  const { title, content, author, subCategory, query, cursor } = req.query;

  if (!isValidCategory(category)) {
    throw new HttpError(401, "권한이 없습니다.");
  }

  let filter = {};

  if (title) {
    filter = { ...filter, title: { $regex: query, $options: "i" } };
  } else if (content) {
    filter = { ...filter, content: { $regex: query, $options: "i" } };
  } else if (author) {
    filter = { ...filter, author: { $regex: query, $options: "i" } };
  } else if (subCategory) {
    filter = { ...filter, subCategory };
  }

  if (cursor) {
    const objectIdCursor = new mongoose.Types.ObjectId(cursor as string);
    filter = { ...filter, _id: { $lt: objectIdCursor } };
  }

  const limit = 18;

  const posts = await postModelMap[category]
    .find(filter)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .populate({ path: "author", select: "_id nickname" })
    .lean();

  const hasNextPage = posts.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = posts[posts.length - 1]._id.toString();

    posts.pop();
  }

  const optimizedPosts = await Promise.all(posts.map(optimizeBbs));

  const postsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.locals.postsData = postsData;
  next();
};

export default getPostsMiddleware;
