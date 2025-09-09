import { NextFunction } from "express";

interface CustomHttpError extends Error {
  status: number;
};

const customHttpErrorHandler = (
  message: string,
  status: number,
  next: NextFunction
) => {
    const err = new Error(message) as CustomHttpError;
    err.name = "CustomHttpError";
    err.status = status;
    next(err);
};

export default customHttpErrorHandler