import type { Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import { User } from "../../mongoose-models/index.js";

const deleteUserMe = async(req: Request, res: Response) => {
  const { user_id } = req.payload!;
  
  const user = await User.findByIdAndDelete(
    user_id,
    {
      new: true,
    }
  );
  if (!user) {
    throw new HttpError(404, "사용자를 찾을 수 없습니다.");
  }
  
  res.status(204).json();
};

export default deleteUserMe;