import type { Request, Response, NextFunction } from "express";
import type { PipelineStage } from "mongoose";
import mongoose from "mongoose";

import type { Post } from "../../types/post.js";
import HttpError from "../../error/http-error.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import optimizeBbs from "../../utils/optimize-bbs.js";

const getPostsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { category } = req.params;

  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const {
    subCategory,
    queryOption,
    keyword,
    cursor
  } = req.query;

  let filter = {};

  switch (queryOption) {
    case "title":
      filter = { title: { $regex: keyword, $options: "i" } };
      break;
    case "content":
      filter = { content: { $regex: keyword, $options: "i" } };
      break;
    case "titleAndContent":
      filter = { $or: [
          { title: { $regex: keyword, $options: "i" } },
          { content: { $regex: keyword, $options: "i" } }
        ]
      };
      break;
    case "author":
      filter = { author: { $regex: keyword, $options: "i" } };
      break;
  }

  if (subCategory && subCategory!== "all") {
    filter = { ...filter, subCategory }
  }

  if (cursor) {
    const objectIdCursor = new mongoose.Types.ObjectId(cursor as string);
    filter = {
      ...filter,
      _id: { $lte: objectIdCursor }
    };
  }

  const limit = 12;

  const aggregationPipeline: PipelineStage[] = [
    { $match: filter },
    {
      $sort: { _id: -1, }
    },
    { $limit: limit + 1 },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      }
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        author: {
          _id: 1,
          nickname: 1,
          profileImageUrl: 1,
        },
        title: 1,
        content: 1,
        subCategory: {
          $cond: {
            if: { $ne: ["$subCategory", undefined] },
            then: "$subCategory",
            else: "$$REMOVE",
          }
        },
        views: 1,
        likes: 1,
        commentCount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    }
  ];

  const posts = await postModelMap[category].aggregate(aggregationPipeline);

  const hasNextPage = posts.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = posts[posts.length - 1]._id.toString();

    posts.pop();
  }

  const unoptimizedPosts = posts.map(async (post: Post) => optimizeBbs(category, post));
  const optimizedPosts = await Promise.all(unoptimizedPosts);

  const postsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.locals.postsData = postsData;

  next();
};

export default getPostsMiddleware;
