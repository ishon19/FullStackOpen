const listHelper = require("../utils/list_helper");
const blogs = require("../utils/list_helper").blogs;

test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when the list has only one blog, equals the like of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("the favorite blog is Canonical string reduction", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("author with most likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
