const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.map((blog) => (sum += blog?.likes ?? 0));
  return sum;
};

const favoriteBlog = (blogs) => {
  let favouriteBlogObj = { title: "", author: "", likes: 0 };
  let maxLikes = -1;
  let favIndex = -1;
  blogs.map((blog, index) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      favIndex = index;
    }
  });

  if (maxLikes !== -1 && favIndex !== -1) {
    favouriteBlogObj.title = blogs[favIndex]["title"];
    favouriteBlogObj.author = blogs[favIndex]["author"];
    favouriteBlogObj.likes = blogs[favIndex]["likes"];
  }

  return favouriteBlogObj;
};

module.exports = { dummy, totalLikes, favoriteBlog };
