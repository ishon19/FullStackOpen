/* eslint-disable no-prototype-builtins */
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  let toSave = request.body;
  if (!toSave.hasOwnProperty("title") && !toSave.hasOwnProperty("url")) {
    response.status(400).end();
    return;
  }

  if (!toSave.hasOwnProperty("likes")) {
    toSave = { ...toSave, likes: 0 };
  }

  const user = await User.findById(toSave.user);
 
  //push the user information
  toSave.user = user._id;

  const blog = new Blog(toSave);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(204).json(updatedNote);
});

module.exports = blogsRouter;
