import { Request, Response } from "express";
import mongoose, { PipelineStage } from "mongoose";

import type { Post as PostType } from "../../types/post.js";
import { SearchTarget } from "../../types/search-type.js";
import { Post } from "../../mongoose-models/index.js";
import optimizePosts from "../../utils/optimize-bbs.js";

const getIntegratedSearch = async (req: Request, res: Response) => {
  const {
    "search-target": searchTarget,
    "search-query": searchQuery,
    cursor
  } = req.query as {
    "search-target": SearchTarget,
    "search-query": string,
    cursor?: string
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

  switch (searchTarget) {
    case "title":
      filter = {
        title: {
          $regex: searchQuery,
          $options: "i",
        },
      };
      break;
    
    case "content":
      filter = {
        content: {
          $regex: searchQuery,
          $options: "i",
        },
      };
      break;
    
    case "titleOrContent":
      filter = {
        $or: [
          {
            title: {
              $regex: searchQuery,
              $options: "i",
            }
          },
          {
            content: {
              $regex: searchQuery,
              $options: "i",
            }
          },
        ]
      };
      break;

    case "author":
      break;

    default:
      filter = {
        $or: [
          {
            title: {
              $regex: searchQuery,
              $options: "i",
            },
          },
          {
            content: {
              $regex: searchQuery,
              $options: "i",
            },
          },
        ],
      };
  }

  if (cursor) {
    const objectIdCursor = new mongoose.Types.ObjectId(cursor as string);
    filter = {
      ...filter,
      _id: {
        $lte: objectIdCursor
      },
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

  aggregationPipeline.push(
    {
      $sort: {
        _id: -1,
      }
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

  const posts = await Post.aggregate(aggregationPipeline);

  const hasNextPage = posts.length > limit;
  
  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = posts[posts.length - 1]._id.toString();

    posts.pop();
  }

  const unoptimizedPosts = posts.map(
    async (post: PostType) => optimizePosts(post)
  );
  const optimizedPosts = await Promise.all(unoptimizedPosts);

  const postsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.status(200).json(postsData);
};

export default getIntegratedSearch;