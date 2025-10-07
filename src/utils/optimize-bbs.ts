import * as cheerio from "cheerio";

import type { Category } from "../types/category.js";
import type { Post } from "../types/post.js";

const optimizeBbs = async (category: Category, post: Post) => {
  const $ = cheerio.load(post.content || "");

  const firstImage = $("img").first();

  const thumbnailUrl = firstImage.length ? firstImage.attr("src") : null;
  
  const textContent = $("body").text().trim().slice(0, 700);
  
  const commentCount = (post.comments).reduce((acc, comment) => {
    const replies = comment.replies.length;

    return acc + (comment.deletedHavingReply ? replies : 1 + replies);
  }, 0);
  
  const { comments, ...rest } = post;

  return category === "thread"
    ?  {
      ...rest,
      content: textContent,
      commentCount,
      comments,
      thumbnailUrl
    }
    : {
        ...rest,
        content:
        textContent,
        commentCount,
        thumbnailUrl
      };
};

export default optimizeBbs;
