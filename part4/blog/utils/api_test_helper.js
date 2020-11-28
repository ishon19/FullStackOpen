const Blog = require("../models/blog");

const getAllBlogs = async () => {
  const blogList = await Blog.find({});
  return blogList.map((blog) => blog.toJSON());
};

module.exports = { getAllBlogs };
