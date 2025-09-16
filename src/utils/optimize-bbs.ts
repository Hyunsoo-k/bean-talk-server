import * as cheerio from "cheerio";

import Post from "../types/post.js";

const optimizeBbs = async (post: Post) => {
  const $ = cheerio.load(post.content || "");

  const firstImage = $("img").first();

  const thumbnailSrc = firstImage.length ? firstImage.attr("src") : null;
  
  const textContent = $("body").text().trim().slice(0, 700);
  
  const commentCount = (post.comments).reduce((acc, comment) => {
    const replies = comment.replies.length;

    return acc + (comment.deletedHavingReply ? replies : 1 + replies);
  }, 0);
  
  const { comments, ...rest } = post;

  return { ...rest, content: textContent, commentCount, thumbnailSrc };
};

export default optimizeBbs;
