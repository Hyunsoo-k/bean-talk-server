import { Request, Response } from "express";
import mongoose from "mongoose";

import optimizePosts from "../../utils/optimize-bbs.js";
import { MyPostContainer } from "../../mongoose-models/index.js";

const getMyPosts = async (req: Request, res: Response): Promise<any> => {
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

  const myPosts = await MyPostContainer.aggregate(pipeline);

  const hasNextPage = myPosts.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = myPosts[limit - 1]._id.toString();

    myPosts.pop();
  }

  const unoptimizedPosts = myPosts.map(async (post: any) => optimizePosts(post));
  const optimizedPosts = await Promise.all(unoptimizedPosts);

  const myPostsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.status(200).json(myPostsData);
};

export default getMyPosts;