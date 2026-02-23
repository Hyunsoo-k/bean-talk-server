import { NextFunction, Request, Response } from "express";

import { Category } from "../types/category.js";
import CATEGORIES_HAVING_SUB_CATEGORY from "../variables/categories-having-sub-category.js";
import HttpError from "../error/http-error.js";

const validatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    title,
    content,
    subCategory,
    employmentType,
    position,
    payAmount,
    startTime,
    endTime,
    address,
    latitude,
    longitude,
    } = req.body;

  if (!title || !content) {
    throw new HttpError(400, "제목과 내용은 필수 입니다.");
  }

  const { category } = req.params as {
    category: Category,
    post_id: string
  };

  if (CATEGORIES_HAVING_SUB_CATEGORY.includes(category) && !subCategory) {
    throw new HttpError(400, "서브 카테고리는 필수입니다.");
  }

  if (category === "job") {
    const requiredFields = [
      employmentType,
      position,
      payAmount,
      startTime,
      endTime,
      address,
      latitude,
      longitude,
    ];

    const hasMissingField = requiredFields.some(
      (field) => field === undefined
    );

    if (hasMissingField) {
      throw new HttpError(400, "필수 항목이 누락되었습니다.");
    }
  }

  next();
};

export default validatePost;