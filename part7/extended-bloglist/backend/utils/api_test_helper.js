const Blog = require("../models/blog");
const User = require("../models/user");

const getAllBlogs = async () => {
  const blogList = await Blog.find({});
  return blogList.map((blog) => blog.toJSON());
};

const getAllUsers = async () => {
  const userList = await User.find({});
  return userList.map((user) => user.toJSON());
};

module.exports = { getAllBlogs, getAllUsers };
