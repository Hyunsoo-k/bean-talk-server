import { NextFunction, Request, Response } from "express";
import HttpError from "../error/http-error.js";

const validateSearchLocalQuery = async (req: Request, res: Response, next: NextFunction) => {
  const { query, page } = req.query;
  if (!query) {
    throw new HttpError(400, "잘못된 검색어입니다.");
  }

  if (page) {
    const pageNumber = Number(page);
    
    if (isNaN(pageNumber) || pageNumber < 1 || !Number.isInteger(pageNumber)) {
      throw new HttpError(400, "페이지 번호는 1 이상의 정수여야 합니다.");
    }

    /**
     * 카카오 API의 페이지네이션 한계값
     */
    if (pageNumber > 45) {
      throw new HttpError(400, "최대 45페이지까지만 조회 가능합니다.");
    }
  }

  next();
};

export default validateSearchLocalQuery