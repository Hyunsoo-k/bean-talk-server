import { NextFunction } from "express";
import mongoose from "mongoose";

import customHttpErrorHandler from "../error-handler/custom-http-error-handler.js";

const stringToObjectId = (string_id: string, next: NextFunction): mongoose.Types.ObjectId => {
  if (!mongoose.Types.ObjectId.isValid(string_id)) {
    customHttpErrorHandler("문서 _id로 변환할 수 없는 값입니다.", 400, next)
  }

  return new mongoose.Types.ObjectId(string_id);
};

export default stringToObjectId;