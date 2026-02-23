import { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/index.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer } from "../../mongoose-models/index.js";

const getComments = async (req: Request, res: Response) => {
  const { post_id } = req.params as {
    category: Category,
    post_id: string,
  };

  const pipeline = [
    {
      $match: {
        post_id: new mongoose.Types.ObjectId(post_id),
      },
    },
    {
      $unwind: "$comments",
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.author",
        foreignField: "_id",
        as: "author"
      }
    },
    {
      $unwind: "$author",
    },
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
      $lookup: {
        from: "users",
        let: {
          replyAuthors: "$comments.replies.author",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: [
                  "$_id",
                  "$$replyAuthors"
                ]
              }
            }
          },
          {
            $project: {
              _id: 1,
              nickname: 1,
              profileImageUrl: 1
            }
          }
        ],
        as: "replyAuthorsData"
      }
    },
    {
      $addFields: {
        "comments.replies": {
          $map: {
            input: "$comments.replies",
            as: "reply",
            in: {
              $mergeObjects: [
                "$$reply",
                {
                  author: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$replyAuthorsData",
                          as: "ra",
                          cond: {
                            $eq: [
                              "$$ra._id",
                              "$$reply.author"
                            ]
                          }
                        }
                      },
                      0
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    },
    {
      $replaceRoot: {
        newRoot: "$comments",
      },
    }
  ];

  const comments = await CommentContainer.aggregate(pipeline);
  if (!comments) {
    throw new HttpError(404, "댓글 목록을 찾을 수 없습니다.");
  }

  res.status(200).json(comments);
};

export default getComments;