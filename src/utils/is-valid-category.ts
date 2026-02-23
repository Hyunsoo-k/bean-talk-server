import type { Category } from "../types/category.js";

const isValidCategory  = (category: string): category is Category => {
  const validCategories = [
    "thread",
    "promotion",
    "job",
    "news",
    "notice"
  ];

  if (!validCategories.includes(category)) {
    return false;
  }

  return true;
};

export default isValidCategory ;