import { SubCategory } from "./category.js"
import { SearchType } from "./search-type.js";

type PostsQueryString = {
  "sub-category"?: SubCategory | "all";
  "type"?: SearchType;
  "query"?: string;
  "cursor"?: string;
};

export type { PostsQueryString }