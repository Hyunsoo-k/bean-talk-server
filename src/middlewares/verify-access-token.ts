import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import type { Payload } from "../types/payload.js";
import HttpError from "../error/http-error.js";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new HttpError(401, "권한이 없습니다.");
  }

  const accessToken = authorization.split(" ")[1];
  const payload = jwt.verify(accessToken, JWT_SECRET_KEY) as Payload;

  req.payload =  payload;

  next();
};

export default verifyAccessToken;