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

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e: any) => e.message);

    return res.status(400).json({ message: errors[0] });
  }
  
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).send({ message: "잘못된 요청 값입니다." });
  }

  if (isCustomHttpError(err)) {
    return res.status(err.status).send({ message: err.message });
  }

  return res.status(500).send({ message: err.message || "서버 내부 오류가 발생했습니다." });
};

export default globalErrorHandler;
