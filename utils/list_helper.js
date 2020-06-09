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

const sortBlogs = (blogs) => {
  blogs = blogs.sort((a, b) => {
    if (a.author < b.author) {
      return -1;
    }
    if (a.author > b.author) {
      return 1;
    }
    return 0;
  });
  return blogs;
};

const mostBlogs = (blogs) => {
  let totalBlogsPerAuthor = [];
  if (blogs.length <= 0) return [];
  let blogsAux = sortBlogs(blogs);
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

const mostLikes = (blogs) => {
  let totalLikesPerAuthor = [];
  if (blogs.length <= 0) return [];
  let blogsAux = sortBlogs(blogs);
  while (blogsAux.length > 0) {
    let author = blogsAux[0].author;
    let totalLikes = blogsAux.reduce((acc, element) => acc + element.likes, 0);
    blogsAux = _.dropWhile(blogsAux, ["author", blogsAux[0].author]);
    let likesNum =
      totalLikes - blogsAux.reduce((acc, element) => acc + element.likes, 0);
    totalLikesPerAuthor.push({ author: author, likes: likesNum });
  }
  let totalLikesPerAuthorDescendingOrder = totalLikesPerAuthor.sort((a, b) => {
    return b.likes - a.likes;
  });
  return totalLikesPerAuthorDescendingOrder[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
