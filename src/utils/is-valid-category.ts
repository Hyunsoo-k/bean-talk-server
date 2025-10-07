import type { Category } from "../types/category.js";

const isValidCategory  = (category: string): category is Category => {
  if (
    category !== "thread"
    && category !== "promotion"
    && category !== "job"
    && category !== "news"
    && category !== "notice"
  ) {
    return false;
  }

  return true;
};

export default isValidCategory ;