/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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

  //token validation
  console.log("Token for verification: ", request.token);
  if (!request.token) {
    return response.status(401).json({ error: "Token Missing" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token Invalid" });
  }
  const user = await User.findById(decodedToken.id);

  //push the user information
  toSave.user = user._id;

  const blog = new Blog(toSave);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogIDtoDelete = request.params.id;

  //check if a valid token exists for the user
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }
  const decodedToken = await jwt.verify(token, process.env.SECRET);

  //search the blog and find the user
  const blog = await Blog.findById(blogIDtoDelete);
  console.log("Blog: ", blog);

  //the the decoded userid and the blog creators id match then only proceed
  if (
    decodedToken.id.toString().toLowerCase() !==
    blog.user.toString().toLowerCase()
  ) {
    return response.status(401).json({ error: "user not authorized" });
  }

  await Blog.findByIdAndRemove(blogIDtoDelete);
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
