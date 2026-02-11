import { NextFunction, Request, Response } from "express";

import verifyAccessToken from "../../utils/verify-access-token.js";

const getMyScrapsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = verifyAccessToken(req);
};

export default { getMyScrapsMiddleware };