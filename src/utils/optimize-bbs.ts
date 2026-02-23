import * as cheerio from "cheerio";

import type { Post } from "../types/post.js";
import type { Category } from "../types/category.js";

const optimizePosts = async (post: Post, category?: Category, ) => {
  const $ = cheerio.load(post.content || "");

  const firstImage = $("img").first();
  const thumbnailUrl = firstImage.length ? firstImage.attr("src") : null;
  
  const textContent = $("body").text().trim().slice(0, 700);

  return {
    _id: post._id,
    ...(category && (category !== "thread") && {
      subCategory: post.subCategory
    }),
    views: post.views,
    likes: post.likes,
    scraps: post.scraps,
    commentCount: post.commentCount,
    author: post.author,
    thumbnailUrl,
    title: post.title,
    content: textContent,
    ...(category === "job" && {
      employmentType: post.employmentType,
      position: post.position,
      payAmount: post.payAmount,
      startTime: post.startTime,
      endTime: post.endTime,
    }),
    ...(category === "job" && post.subCategory === "hiring" && {
      address: post.address,
      latitude: post.latitude,
      longitude: post.longitude,
    }),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
};

export default optimizePosts;
