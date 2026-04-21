import { Category, CategoryHavingSubCategory } from "../types/category.js";
import CATEGORIES_HAVING_SUB_CATEGORY from "../variables/categories-having-sub-category.js";

const isCategoryHavingSubCategory = (category: Category): category is CategoryHavingSubCategory => {
  const hasSubCategory = CATEGORIES_HAVING_SUB_CATEGORY.includes(category);

  return hasSubCategory;
};

export default isCategoryHavingSubCategory;