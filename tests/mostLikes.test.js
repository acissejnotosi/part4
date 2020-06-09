const listHelper = require("../utils/list_helper");
const mock_data = require("../utils/mock_data");

describe("Most Likes", () => {
  test("Most likes in a big list", () => {
    const result = listHelper.mostLikes(mock_data.blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });

  test("Most likes with empty array", () => {
    const result = listHelper.mostLikes(mock_data.emptyList);
    expect(result).toEqual([]);
  });

  test("Most likes with array with single element", () => {
    const result = listHelper.mostLikes(mock_data.oneBlog);
    expect(result).toEqual({ author: "Robert C. Martin", likes: 2 });
  });
});
