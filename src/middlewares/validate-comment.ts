import { NextFunction, Request, Response } from "express";
import HttpError from "../error/http-error.js";

const validateComment = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { content } = req.body;

  if (typeof content !== "string") {
    throw new HttpError(400, "내용 형식이 올바르지 않습니다.");
  }

  const trimmed = content.trim();

  if (!trimmed) {
    throw new HttpError(400, "내용을 입력해 주세요.");
  }

  if (trimmed.length < 2 || trimmed.length > 1000) {
    throw new HttpError(400, "내용은 2자 이상, 1000자 이하여야 합니다.");
  }

  req.body.content = trimmed;

  next();
};

export default validateComment;