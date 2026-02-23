import { NextFunction, Request, Response } from "express";
import HttpError from "../error/http-error.js";

const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password
  } = req.body;
  if (typeof email !== "string" || typeof password !== "string") {
    throw new HttpError(400, "올바르지 않은 형식입니다.");
  }

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmedEmail)) {
    throw new HttpError(400, "올바른 이메일 형식이 아닙니다.");
  }

  if (trimmedPassword.length < 7 || trimmedPassword.length > 20) {
    throw new HttpError(400, "비밀번호는 7자 이상, 20자 이하여야 합니다.");
  }

  req.body.email = trimmedEmail;
  req.body.password = trimmedPassword;

  next();
};

export default validateLogin;