import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

interface CustomHttpError extends Error {
  status: number;
};

const isCustomHttpError = (err: any): err is CustomHttpError => {
  return (
    err &&
    typeof err === "object" &&
    err.name === "CustomHttpError" &&
    typeof err.status === "number"
  );
};

const globalErrorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    return res.status(400).json({ message: errors[0] });
  }
  
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: "잘못된 요청 값입니다." });
  }

  if (isCustomHttpError(err)) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message || "서버 내부 오류가 발생했습니다." });
};

export default globalErrorHandler;
