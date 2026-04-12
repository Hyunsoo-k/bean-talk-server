import type { Request, Response } from "express";
import type { PipelineStage } from "mongoose";
import mongoose from "mongoose";

import type { Category, Post } from "../../types/index.js";
import POST_MODELS from "../../variables/post-models.js";
import optimizePosts from "../../utils/optimize-bbs.js";

const getPosts = async (req: Request, res: Response) => {
  const { category } = req.params as { category: Category };
  const {
    "sub-category": subCategory,
    "search-target": searchTarget,
    "search-query": searchQuery,
    cursor,
  } = req.query as {
    "sub-category"?: string;
    "search-target"?: string;
    "search-query"?: string;
    cursor?: string;
  };

  const limit = 12;
  const aggregationPipeline: PipelineStage[] = [];

  let filter: any = {};
  const regexQuery = searchQuery
    ? {
      $regex: searchQuery,
      $options: "i"
    }
    : null;

  if (regexQuery) {
    switch (searchTarget) {
      case "title":
        filter.title = regexQuery;
        break;

      case "content":
        filter.content = regexQuery;
        break;

      case "titleOrContent":
        filter.$or = [
          {
            title: regexQuery,
          },
          {
            content: regexQuery,
          },
        ];
        break;
      
      case "author":
        break;
      
      default:
        filter.$or = [
          {
            title: regexQuery,
          },
          {
            content: regexQuery,
          }
        ]
    }
  }

  if (subCategory && subCategory !== "all") {
    filter.subCategory = subCategory;
  }

  if (cursor) {
    filter._id = {
      $lt: new mongoose.Types.ObjectId(cursor),
    };
  }

  if (searchTarget === "author" && searchQuery) {
    aggregationPipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $match: {
          "author.nickname": regexQuery,
          ...(subCategory && subCategory !== "all"
              ? { subCategory }
              : {}
            ),
          ...(cursor
            ? { _id: { $lt: new mongoose.Types.ObjectId(cursor) } }
            : {}
          ),
        },
      }
    );
  } else {
    aggregationPipeline.push({
      $match: filter,
    });
  }

  aggregationPipeline.push(
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: limit + 1,
    }
  );

  if (searchTarget !== "author") {
    aggregationPipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      }
    );
  }

  aggregationPipeline.push({
    $project: {
      author: {
        _id: 1,
        nickname: 1,
        profileImageUrl: 1,
      },
      thumbnailUrl: 1,
      title: 1,
      content: 1,
      category: 1,
      subCategory: {
        $cond: {
          if: { $ne: ["$subCategory", undefined] },
          then: "$subCategory",
          else: "$$REMOVE",
        },
      },
      views: 1,
      likes: 1,
      scraps: 1,
      commentCount: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  });

  const posts = await POST_MODELS[category].aggregate(aggregationPipeline);

  const hasNextPage = posts.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = posts[posts.length - 1]._id.toString();

    posts.pop();
  }

  const unoptimizedPosts = posts.map(
    async (post: Post) => optimizePosts(post, category)
  );
  const optimizedPosts = await Promise.all(unoptimizedPosts);

  res.status(200).json({
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  });
};

export default getPosts;