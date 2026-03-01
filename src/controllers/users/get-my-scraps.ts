import { Request, Response } from "express";
import mongoose from "mongoose";

import optimizePosts from "../../utils/optimize-bbs.js";
import { MyScrapContainer } from "../../mongoose-models/index.js";

const getMyScraps = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const { cursor } = req.query as { cursor: string };
  
  const limit = 12;

  const pipeline: mongoose.PipelineStage[] = [
    {
      $match: {
        user_id: new mongoose.Types.ObjectId(user_id),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "posts",
        foreignField: "_id",
        as: "posts",
      }
    },
    {
      $unwind: {
        path: "$posts",
      }
    },
    {
      $replaceRoot: {
        newRoot: "$posts",
      }
    },
    ...(cursor 
        ? [
            {
              $match: {
                _id: {
                  $lt: new mongoose.Types.ObjectId(cursor),
                }
              }
            }
          ]
        : []
      ),
    {
      $sort: {
        _id: -1,
      }
    },
    {
      $limit: limit + 1,
    },
  ];

  const myScraps = await MyScrapContainer.aggregate(pipeline);

  const hasNextPage = myScraps.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = myScraps[limit - 1]._id.toString();

    myScraps.pop();
  }

  const unoptimizedPosts = myScraps.map(async (post: any) => optimizePosts(post));
  const optimizedPosts = await Promise.all(unoptimizedPosts);

  const myScrapsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.status(200).json(myScrapsData);
};

export default getMyScraps;