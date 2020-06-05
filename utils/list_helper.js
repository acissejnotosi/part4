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
  return blogsFormatted.filter((element) => element.likes === biggestNumOfLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
