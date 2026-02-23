import { NextFunction, Request, Response } from "express";

import HttpError from "../error/http-error.js";

const validateUserMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    nickname,
    password,
    profileImageUrl
  } = req.body;
  if (!nickname || !password || !profileImageUrl) {
    throw new HttpError(400, "필수 값이 누락되었습니다.");
  }

  if (nickname && (nickname.length < 2 || nickname.length > 7)) {
    return next(new HttpError(400, "닉네임은 2자 이상 7자 이하로 입력해주세요."));
  }

  if (password && (password.length < 8 || password.length > 20)) {
    return next(new HttpError(400, "비밀번호는 8자 이상 20자 이하로 입력해주세요."));
  }

  if (profileImageUrl && !profileImageUrl.startsWith("http")) {
    return next(new HttpError(400, "유효한 이미지 URL 형식이 아닙니다."));
  }

  next();
};

export default validateUserMe;