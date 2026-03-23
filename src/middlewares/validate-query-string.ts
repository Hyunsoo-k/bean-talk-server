import { NextFunction, Request, Response } from "express";
import HttpError from "../error/http-error.js";
import { SubCategory } from "../types/category.js";
import { SearchTarget } from "../types/searchTarget.js";

const VALID_SUB_CATEGORIES = [
  "cafe",
  "delivery",
  "hiring",
  "seeking",
  "domestic",
  "international"
] as const;

const VALID_SEARCH_TARGETS = [
  "titleOrContent",
  "title",
  "content",
  "author"
] as const;

const validateQueryString = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    "sub-category": subCategory,
    "search-target": searchTarget,
    "search-query": searchQuery
  } = req.query as {
    "sub-category"?: SubCategory
    "search-target"?: SearchTarget,
    "search-query"?: string
    "cursor"?: string
  };

  if (
    subCategory &&
    !VALID_SUB_CATEGORIES.includes(subCategory as typeof VALID_SUB_CATEGORIES[number])
  ) {
    throw new HttpError(400, "올바르지 않은 서브 카테고리 입니다.");
  }

  if (searchTarget) {
    if (!VALID_SEARCH_TARGETS.includes(searchTarget as typeof VALID_SEARCH_TARGETS[number])) {
      throw new HttpError(400, "올바르지 않은 검색 타입 입니다.");
    }

    if (!searchQuery) {
      throw new HttpError(400, "검색어를 입력해 주세요.");
    }
  }

  next();
};

export default validateQueryString;