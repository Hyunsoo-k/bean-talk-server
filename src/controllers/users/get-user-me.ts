import type { Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import { User } from "../../mongoose-models/index.js";

const getUserMe = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const userMe = await User
    .findById(
      user_id,
      {
        _id: 1,
        email: 1,
        nickname: 1,
        profileImageUrl: 1,
      }
    )
    .lean();
  if (!userMe) {
    throw new HttpError(404, "사용자를 찾을 수 없습니다.");
  }

  res.status(200).json(userMe);
};

export default getUserMe;