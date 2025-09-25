import { NextFunction, Request } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import customHttpErrorHandler from "../error-handler/custom-http-error-handler.js";

dotenv.config();

type Payload = {
  user_id: string;
};

const verifyAccessToken = (req: Request, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw customHttpErrorHandler("권한이 없습니다", 401, next);
  }

  const accessToken = authorization.split(" ")[1];
  const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as Payload;

  return payload;
};

export default verifyAccessToken