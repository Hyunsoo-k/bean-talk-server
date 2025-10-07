import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import type { Post } from "../../types/post.js";
import HttpError from "../../error/http-error.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import optimizeBbs from "../../utils/optimize-bbs.js";

const getPostsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { category, subCategory } = req.params;
  const {
    queryOption,
    keyword,
    cursor
  } = req.query;

  if (!isValidCategory(category)) {
    throw new HttpError(401, "권한이 없습니다.");
  }

  let filter = {};

  switch (queryOption) {
    case "title":
      filter = {
        ...filter,
        title: {
          $regex: keyword,
          $options: "i"
        }
      }
      break;
    case "content":
      filter = {
        ...filter,
        content: {
          $regex: keyword,
          $options: "i"
        }
      }
      break;
    case "titleAndContent":
      filter = {
        ...filter,
        $or: [
          {
            title: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            content: {
              $regex: keyword,
              $options: "i"
            }
          }
        ]
      }
      break;
    case "author":
      filter = {
      ...filter,
      author: {
        $regex: keyword,
        $options: "i"
      }
    };
      break;
  }

  if (subCategory !== "all") {
    filter = { ...filter, subCategory }
  }

  if (cursor) {
    const objectIdCursor = new mongoose.Types.ObjectId(cursor as string);
    filter = {
      ...filter,
      _id: { $lt: objectIdCursor }
    };
  }

  const limit = 12;

  const posts = await postModelMap[category]
    .find(filter)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .populate([
      {
        path: "author",
        select: "_id nickname"
      },
      {
        path: "comments",
        populate: [
          {
            path: "author",
            select: "_id nickname"
          },
          {
            path: "replies.author",
            select: "_id nickname"
          }
        ]
      }
    ])
    .lean();

  const hasNextPage = posts.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = posts[posts.length - 1]._id.toString();

    posts.pop();
  }

  const optimizedPosts = await Promise.all(posts.map(async (post: Post) => optimizeBbs(category, post)));

  const postsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.locals.postsData = postsData;
  next();
};

export default getPostsMiddleware;
