import type { Request, Response } from "express";

import type { Category } from "../../types/category.js";
import POST_MODELS from "../../variables/post-models.js";
import HttpError from "../../error/http-error.js";

const getPost = async (req: Request, res: Response): Promise<any> => {
  const {
    category,
    post_id
  } = req.params as {
    category: Category,
    post_id: string
  };
  
  const post = await POST_MODELS[category]
    .findByIdAndUpdate(
      post_id,
      {
        $inc: {
          views: 1,
        },
      },
      {
        new: true,
      }
    )
    .populate(
      {
        path: "author",
        select: "nickname profileImageUrl"
      }
    )
    .lean();
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  }
  
  res.status(200).json(post);
};

export default getPost;
