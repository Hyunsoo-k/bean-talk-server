import { NextFunction, Request, Response } from "express";
import HttpError from "../error/http-error.js";

const VALID_SEARCH_TARGET_OPTIONS = [
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
    "search-target": searchTarget,
    "search-query": searchQuery
  } = req.query as {
    "search-target": string,
    "search-query": string
  };

  if (!searchTarget) {
    throw new HttpError(400, "검색타입을 입력해 주세요.")
  }

  if (searchTarget) {
    if (!VALID_SEARCH_TARGET_OPTIONS.includes(searchTarget as typeof VALID_SEARCH_TARGET_OPTIONS[number])) {
      throw new HttpError(400, "올바르지 않은 검색타입 입니다.");
    }
  }
  
  if (!searchQuery) {
    throw new HttpError(400, "검색어를 입력해 주세요.");
  }

  next();
};

export default validateQueryString;