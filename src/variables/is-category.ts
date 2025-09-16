export const categoryArray = ["thread", "promotion", "job", "news", "notice"] as const;
export type Category = typeof categoryArray[number];

export function isCategory(value: any): value is Category {
  return categoryArray.includes(value as Category);
}