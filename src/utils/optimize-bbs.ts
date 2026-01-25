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
    employmentType,
    position,
    payAmount,
    startTime,
    endTime,
    address,
    latitude,
    longitude,
    createdAt,
    updatedAt,
  } = post;

  const $ = cheerio.load(post.content || "");

  const firstImage = $("img").first();

  const thumbnailUrl = firstImage.length ? firstImage.attr("src") : null;
  
  const textContent = $("body").text().trim().slice(0, 700);

  return {
    _id,
    ...(category !== "thread" && {
      subCategory
    }),
    views,
    likes,
    scraps,
    commentCount,
    author,
    thumbnailUrl,
    title,
    content: textContent,
    ...(category === "job" && {
      employmentType,
      position,
      payAmount,
      startTime,
      endTime,
    }),
    ...(category === "job" && subCategory === "hiring" && {
      address,
      latitude,
      longitude,
    }),
    createdAt,
    updatedAt,
  };
};

export default optimizeBbs;
