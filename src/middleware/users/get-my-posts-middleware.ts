import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import optimizeBbs from "../../utils/optimize-bbs.js";
import { MyPostContainer } from "../../mongoose-models/index.js";

const getMyPostsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const { cursor } = req.query;
  
  const limit = 12;

  const pipeline: any[] = [
    {
      $match: {
        user_id: new Types.ObjectId(user_id)
      }
    },
    {
      $unwind: "$posts"
    }
  ];

  if (cursor) {
    const objectIdCursor = new Types.ObjectId(cursor as string);
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

  const myPosts = await MyPostContainer.aggregate(pipeline);

  const hasNextPage = myPosts.length > limit;

  let nextCursor = null;

  if (hasNextPage) {
    nextCursor = myPosts[limit - 1]._id.toString();

    myPosts.pop();
  }

  const unoptimizedPosts = myPosts.map(async (post: any) => optimizeBbs(post));
  const optimizedPosts = await Promise.all(unoptimizedPosts);

  const myPostsData = {
    posts: optimizedPosts,
    hasNextPage,
    nextCursor,
  };
  
  res.locals.myPostsData = myPostsData;

  next();
};

export default getMyPostsMiddleware;