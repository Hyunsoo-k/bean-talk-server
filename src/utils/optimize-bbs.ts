import * as cheerio from "cheerio";

import type { Category } from "../types/category.js";
import type { Post } from "../types/post.js";

const optimizeBbs = async (category: Category, post: Post) => {
  const {
    _id,
    views,
    likes,
    scraps,
    commentCount,
    subCategory,
    author,
    title,
    createdAt,
    updatedAt,
  } = post;

  const $ = cheerio.load(post.content || "");

  const firstImage = $("img").first();

  const thumbnailUrl = firstImage.length ? firstImage.attr("src") : null;
  
  const textContent = $("body").text().trim().slice(0, 700);

  return (category === "promotion" || category === "job")
    ?  {
        _id,
        views,
        likes,
        scraps,
        commentCount,
        subCategory,
        author,
        thumbnailUrl,
        title,
        content: textContent,
        createdAt,
        updatedAt,
      }
    : {
        _id,
        views,
        likes,
        scraps,
        commentCount,
        author,
        title,
        thumbnailUrl,
        content: textContent,
        createdAt,
        updatedAt,
      };
};

export default optimizeBbs;
