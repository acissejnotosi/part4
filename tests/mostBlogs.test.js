const listHelper = require("../utils/list_helper");
const mock_data = require("../utils/mock_data");

describe("Most Blogs", () => {
  test("Most blogs in a big list", () => {
    const result = listHelper.mostBlogs(mock_data.blogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });

  test("Most blogs with empty array", () => {
    const result = listHelper.mostBlogs(mock_data.emptyList);
    expect(result).toEqual([]);
  });

  test("Most blogs with array with single element", () => {
    const result = listHelper.mostBlogs(mock_data.oneBlog);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 1 });
  });
});
