import type { Category } from "../types/category.js";
import CATEGORIES from "./categories.js";

const isCategory = (value: any): value is Category => {
  return CATEGORIES.includes(value as Category);
};

export default isCategory;