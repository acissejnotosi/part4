const listHelper = require("../utils/list_helper");
const mock_data = require('../utils/mock_data');

describe("Favorite Blog", () => {

  test("Favorite blog in a big list", () => {
    const result = listHelper.favoriteBlog(mock_data.blogs);
    expect(result).toEqual([
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
    ]);
  });

  test("Favorite blog in a empty list", () => {
    const result = listHelper.favoriteBlog(mock_data.emptyList);
    expect(result).toEqual([]);
  });

  test("Favorite blog in a list with only one element", () => {
    const result = listHelper.favoriteBlog(mock_data.oneBlog);
    expect(result).toEqual([
      {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 2,
      },
    ]);
  });
});
