import { NextFunction, Request, Response } from "express";
import HttpError from "../error/http-error.js";

const VALID_KEYWORD_OPTIONS = [
  "title",
  "titleOrContent",
  "content",
  "author"
] as const;

const validateQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    keyword,
    "keyword-option" : keywordOption
  } = req.query as {
    keyword: string,
    "keyword-option": string,
  };
  
  if (!keyword) {
    throw new HttpError(400, "검색어를 입력해 주세요.");
  }

  if (keywordOption) {
    if (!VALID_KEYWORD_OPTIONS.includes(keywordOption as typeof VALID_KEYWORD_OPTIONS[number])) {
      throw new HttpError(400, "올바르지 않은 검색타입 입니다.");
    }
  }

  next();
};

export default validateQuery;