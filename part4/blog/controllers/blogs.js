/* eslint-disable no-prototype-builtins */
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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
  const blog = new Blog(toSave);
  const result = await blog.save();
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
