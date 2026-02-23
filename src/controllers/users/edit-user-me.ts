import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import HttpError from "../../error/http-error.js";
import { User } from "../../mongoose-models/index.js";

const editUserMe = async(req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    nickname,
    password,
    profileImageUrl
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(
    user_id,
    {
      $set: {
        nickname,
        password: hashedPassword,
        profileImageUrl,
      }
    },
    {
      new: true,
    }
  );
  if (!user) {
    throw new HttpError(404, "유저를 찾을 수 없습니다.");
  }
  
  res.status(200).json();
};

export default editUserMe;