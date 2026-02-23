import { NextFunction, Request, Response } from "express";

import { isValidCategory } from "../utils/index.js";
import HttpError from "../error/http-error.js";

const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category } = req.params;

  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리입니다.");
  }

  next();
};

export default validateCategory;