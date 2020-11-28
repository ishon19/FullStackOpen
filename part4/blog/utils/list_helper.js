const _ = require("lodash");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const dummy = () => {
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

module.exports = {
  blogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
