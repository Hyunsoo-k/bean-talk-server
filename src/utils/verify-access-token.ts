import { Request } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import type { Payload } from "../types/payload.js";
import HttpError from "../error/http-error.js";

dotenv.config();

const verifyAccessToken = (req: Request) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    throw new HttpError(401, "권한이 없습니다.");
  }

  const accessToken = authorization.split(" ")[1];
  const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as Payload;

  return payload;
};

export default verifyAccessToken;
