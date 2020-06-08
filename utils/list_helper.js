var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let total = blogs.map((blog) => blog.likes);
  if (total.length > 0) {
    return total.reduce(reducer);
  }
  return 0;
};

const favoriteBlog = (blogs) => {
  let blogsFormatted = blogs.map((blog) => {
    return { title: blog.title, author: blog.author, likes: blog.likes };
  });
  let biggestNumOfLikes = 0;
  blogsFormatted.forEach((element) => {
    if (element.likes > biggestNumOfLikes) biggestNumOfLikes = element.likes;
  });
  return blogsFormatted.filter(
    (element) => element.likes === biggestNumOfLikes
  );
};

const mostBlogs = (blogs) => {
  let totalBlogsPerAuthor = [];

  if (blogs.length === 0) return [];

  let blogsAux = blogs.sort((a
    , b) => {
    if (a.author < b.author) {
      return -1;
    }
    if (a.author > b.author) {
      return 1;
    }
    return 0;
  });
  while (blogsAux.length > 0) {
    let author = blogsAux[0].author;
    let length = blogsAux.length;
    blogsAux = _.dropWhile(blogsAux, ["author", blogsAux[0].author]);
    let blogsNum = length - blogsAux.length;
    totalBlogsPerAuthor.push({ author: author, blogs: blogsNum });
  }
  let totalBlogsPerAuthorDescendingOrder = totalBlogsPerAuthor.sort((a, b) => {
    return b.blogs - a.blogs;
  });
  return totalBlogsPerAuthorDescendingOrder[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
