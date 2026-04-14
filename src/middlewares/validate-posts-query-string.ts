import { NextFunction, Request, Response } from "express";

import HttpError from "../error/http-error.js";
import { PostsQueryString } from "../types/posts-query-string.js";

const VALID_SUB_CATEGORIES = [
  "cafe",
  "delivery",
  "hiring",
  "seeking",
  "domestic",
  "international",
  "all"
] as const;

const VALID_SEARCH_TARGETS = [
  "titleOrContent",
  "title",
  "content",
  "author"
] as const;

const validatePostsQueryString = async (req: Request, res: Response, next: NextFunction) => {
  const {
    "sub-category": subCategory,
    "type": type,
    "query": query
  } = req.query as PostsQueryString;

  if (
    subCategory &&
    !VALID_SUB_CATEGORIES.includes(subCategory as typeof VALID_SUB_CATEGORIES[number])
  ) {
    throw new HttpError(400, "올바르지 않은 서브 카테고리 입니다.");
  }

  if (type) {
    if (!VALID_SEARCH_TARGETS.includes(type as typeof VALID_SEARCH_TARGETS[number])) {
      throw new HttpError(400, "올바르지 않은 검색 타입 입니다.");
    }

    if (!query) {
      throw new HttpError(400, "검색어를 입력해 주세요.");
    }
  }

  next();
};

export default validatePostsQueryString;