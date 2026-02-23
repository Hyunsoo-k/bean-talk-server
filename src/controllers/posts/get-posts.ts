import type { Request, Response, NextFunction } from "express";
import type { PipelineStage } from "mongoose";
import mongoose from "mongoose";

import type { Category, Post } from "../../types/index.js";
import POST_MODELS from "../../variables/post-models.js";
import optimizePosts from "../../utils/optimize-bbs.js";

const getPosts = async (req: Request, res: Response) => {
  const { category } = req.params as { category: Category };

  const {
    subCategory,
    queryOption,
    keyword,
    cursor
  } = req.query;

  let filter = {};

  switch (queryOption) {
    case "title":
      filter = {
        title: {
          $regex: keyword,
          $options: "i"
        }
      };
      break;
    case "content":
      filter = {
        content: {
          $regex: keyword,
          $options: "i"
        }
      };
      break;
    case "titleAndContent":
      filter = {
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
      };
      break;
    case "author":
      filter = {
        author: {
          $regex: keyword,
          $options: "i"
        }
      };
      break;
  }

  if (subCategory && subCategory!== "all") {
    filter = {
      ...filter,
      subCategory
    }
  }

  if (cursor) {
    const objectIdCursor = new mongoose.Types.ObjectId(cursor as string);
    filter = {
      ...filter,
      _id: {
        $lte: objectIdCursor
      }
    };
  }

  const limit = 12;

  const aggregationPipeline: PipelineStage[] = [
    {
      $match: filter,
    },
    {
      $sort: {
        _id: -1,
      }
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
      }
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
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
            if: {
              $ne: ["$subCategory", undefined]
            },
            then: "$subCategory",
            else: "$$REMOVE",
          }
        },
        employmentType: {
          $cond: {
            if: {
              $eq: [category, "job"]
            },
            then: "$employmentType",
            else: "$$REMOVE",
          }
        },
        position: {
          $cond: {
            if: {
              $eq: [category, "job"]
            },
            then: "$position",
            else: "$$REMOVE",
          }
        },
        payAmount: {
          $cond: {
            if: {
              $eq: [category, "job"]
            },
            then: "$payAmount",
            else: "$$REMOVE",
          }
        },
        startTime: {
          $cond: {
            if: {
              $eq: [category, "job"]
            },
            then: "$startTime",
            else: "$$REMOVE",
          }
        },
        endTime: {
          $cond: {
            if: {
              $eq: [category, "job"]
            },
            then: "$endTime",
            else: "$$REMOVE",
          }
        },
        address: {
          $cond: {
            if: { 
              $and: [
                {
                  $eq: [category, "job"],
                },
                {
                  $eq: ["$subCategory", "hiring"],
                }
              ]
            },
            then: "$address",
            else: "$$REMOVE", 
          }
        },
        latitude: {
          $cond: {
            if: { 
              $and: [
                {
                  $eq: [category, "job"],
                },
                {
                  $eq: ["$subCategory", "hiring"],
                }
              ]
            },
            then: "$latitude",
            else: "$$REMOVE", 
          }
        },
        longitude: {
          $cond: {
            if: { 
              $and: [
                {
                  $eq: [category, "job"],
                },
                {
                  $eq: ["$subCategory", "hiring"],
                }
              ]
            },
            then: "$longitude",
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

  const postsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.status(200).json(postsData);
};

export default getPosts;
