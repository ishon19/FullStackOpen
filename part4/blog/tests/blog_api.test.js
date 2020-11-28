const helper = require("../utils/list_helper");
const apiHelper = require("../utils/api_test_helper");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObj = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArray);
  console.log("Test Init done");
});

test("blog list length is correct", async () => {
  const blogList = await api.get("/api/blogs");
  expect(blogList.body).toHaveLength(helper.blogs.length);
});

test("check if the id exists", async () => {
  const blogList = await api.get("/api/blogs");
  expect(blogList.body[0].id).toBeDefined();
});

test("a new blog can be posted", async () => {
  const testPost = {
    title: "Test Post",
    author: "Shreyans",
    url: "http://google.co.in",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(testPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const updatedBlogs = await apiHelper.getAllBlogs();
  expect(updatedBlogs).toHaveLength(helper.blogs.length + 1);
});

test("likes has value 0 if missing", async () => {
  // likes missing in the request
  const testPost = {
    title: "Another Test Post",
    author: "Shreyans",
    url: "http://google.co.in",
  };

  await api
    .post("/api/blogs")
    .send(testPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const updatedBlogs = await apiHelper.getAllBlogs();
  expect(updatedBlogs[updatedBlogs.length - 1]["likes"]).toBe(0);
});

test("Error when title and url is missing", async () => {
  const testPost = { author: "Shreyans" };
  await api.post("/api/blogs").send(testPost).expect(400);
});

test("blog can be deleted", async () => {
  const id = "5a422b891b54a676234d17fa";
  await api.delete(`/api/blogs/${id}`).expect(204);
});

test("blogs can be updated", async () => {
  const id = "5a422a851b54a676234d17f7";
  const updatedObject = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 11,
  };
  await api.put(`/api/blogs/${id}`).send(updatedObject).expect(204);
});

afterAll(() => {
  mongoose.connection.close();
});
