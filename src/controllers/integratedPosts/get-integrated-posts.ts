import { Request, Response } from "express";
import mongoose from "mongoose";

import type { Post as PostType } from "../../types/post.js";
import { Post } from "../../mongoose-models/index.js";
import optimizePosts from "../../utils/optimize-bbs.js";

const getIntegratedPosts = async (req: Request, res: Response) => {
  const {
    keyword,
    "keyword-option": keywordOption,
    cursor
  } = req.query as {
    keyword: string,
    "keyword-option"?: "title" | "content" | "titleOrContent" | "author",
    cursor?: string
  };

  let filter = {};

  switch (keywordOption) {
    case "title":
      filter = {
        title: {
          $regex: keyword,
          $options: "i",
        },
      };
      break;
    
    case "content":
      filter = {
        content: {
          $regex: keyword,
          $options: "i",
        },
      };
      break;
    
    case "titleOrContent":
      filter = {
        $or: [
          {
            title: {
              $regex: keyword,
              $options: "i",
            },
            content: {
              $regex: keyword,
              $options: "i",
            },
          },
        ]
      };
      break;

    case "author":
      filter = {
        "author.nickname": {
          $regex: keyword,
          $options: "i",
        },
      }
      break;

    default:
      filter = {
        $or: [
          {
            title: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            content: {
              $regex: keyword,
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

  const limit = 12;

  const aggregationPipeline: mongoose.PipelineStage[] = [
    {
      $match: filter,
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: limit + 1,
    },
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
    },
    {
      $project: {
        author: {
          _id: 1,
          nickname: 1,
          profileImageUrl: 1,
        },
        category: 1,
        title: 1,
        content: 1,
        views: 1,
        likes: 1,
        scraps: 1,
        commentCount: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    }
  ];

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

export default getIntegratedPosts;