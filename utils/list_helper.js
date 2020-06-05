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

module.exports = {
  dummy,
  totalLikes,
};
