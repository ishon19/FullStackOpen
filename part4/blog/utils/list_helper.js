const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.map((blog) => (sum += blog?.likes ?? 0));
  return sum;
};

const favoriteBlog = (blogs) => {
  const favObj = _.maxBy(blogs, "likes");
  return { title: favObj.title, author: favObj.author, likes: favObj.likes };
};

const mostBlogs = (blogs) => {
  const mostBlogsBy = _.maxBy(blogs, "author");
  const blogCount = blogs.filter((blog) => blog.author === mostBlogsBy.author);
  return { author: mostBlogsBy.author, blogs: blogCount.length };
};

const mostLikes = (blogs) => {
  let authorLikeMap = {};
  blogs.forEach((blog) => {
    // eslint-disable-next-line no-prototype-builtins
    if (authorLikeMap.hasOwnProperty(blog.author)) {
      //entry found
      authorLikeMap[`${blog.author}`] += blog.likes;
    } else {
      //new entry
      authorLikeMap[`${blog.author}`] = blog.likes;
    }
  });
  const mostLikesBy = Object.entries(authorLikeMap).filter(
    (arr) => arr[1] === _.max(Object.values(authorLikeMap))
  )[0];
  return { author: mostLikesBy[0], likes: mostLikesBy[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
