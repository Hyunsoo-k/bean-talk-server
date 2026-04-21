type Category = "notice" | "news" | "thread" | "job" | "promotion" | "essay" | "exploration";

type SubCategory ="cafe" | "delivery" | "hiring" | "seeking" | "domestic" | "international";

type CategoryHavingSubCategory = "news" | "job" | "promotion";

export type { Category, SubCategory, CategoryHavingSubCategory };