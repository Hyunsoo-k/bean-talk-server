import * as cheerio from "cheerio";

import type { Post } from "../types/post.js";
import type { Category } from "../types/category.js";

const optimizePosts = async (post: Post, category?: Category, ) => {
  const $ = cheerio.load(post.content || "");
  const slicedContent = $("body").text().trim().slice(0, 700);

  return {
    _id: post._id,
    category: post.category,
    views: post.views,
    likes: post.likes,
    scraps: post.scraps,
    commentCount: post.commentCount,
    author: post.author,
    thumbnailUrl: post.thumbnailUrl,
    title: post.title,
    content: slicedContent,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    // ...(category === "exploration" && { 
    //   address: post.address, 
    //   lat: post.lat, 
    //   lng: post.lng 
    // }),
  };
};

export default optimizePosts;
