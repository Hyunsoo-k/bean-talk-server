import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import isValidCategory from "../../utils/is-valid-category.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const getCommentsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { category, post_id } = req.params;

  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const comments = await CommentContainer.aggregate([
    {
      $match: { post_id: new mongoose.Types.ObjectId(post_id) }
    },
    { $unwind: "$comments" },
    {
      $lookup: {
        from: "users",
        localField: "comments.author",
        foreignField: "_id",
        as: "comments.author"
      }
    },
    { $unwind: "$author" },
    {
      $addFields: {
        "comments.author": {
          _id: "$author._id",
          nickname: "$author.nickname",
          profileImageUrl: "$author.profileImageUrl"
        }
      }
    },
    {
      $replaceRoot: { newRoot: "$comments" }
    }
  ]);
  if (!comments) {
    throw new HttpError(404, "댓글 목록을 찾을 수 없습니다.");
  }

  res.locals.comments = comments;

  next();
};

export default getCommentsMiddleware;