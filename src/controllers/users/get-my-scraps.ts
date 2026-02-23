import { Request, Response } from "express";
import mongoose from "mongoose";

import optimizePosts from "../../utils/optimize-bbs.js";
import { MyScrapContainer } from "../../mongoose-models/index.js";

const getMyScraps = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const { cursor } = req.query;
  
  const limit = 12;

  const pipeline: any[] = [
    {
      $match: {
        user_id: new mongoose.Types.ObjectId(user_id)
      }
    },
    {
      $unwind: "$posts"
    }
  ];

  if (cursor) {
    const objectIdCursor = new mongoose.Types.ObjectId(cursor as string);
    pipeline.push({
      $match: {
        "posts._id": {
          $lt: objectIdCursor
        },
      },
    });
  }

  pipeline.push(
    {
      $sort: {
        "posts._id": -1,
      },
    },
    {
      $limit: limit + 1
    },
    {
      $replaceRoot: {
        newRoot: "$posts",
      },
    }
  );

  const myPosts = await MyScrapContainer.aggregate(pipeline);

  const hasNextPage = myPosts.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = myPosts[limit - 1]._id.toString();

    myPosts.pop();
  }

  const unoptimizedPosts = myPosts.map(async (post: any) => optimizePosts(post));
  const optimizedPosts = await Promise.all(unoptimizedPosts);

  const myScrapsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };

  res.status(200).json(myScrapsData);
};

export default getMyScraps;