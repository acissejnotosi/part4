const listHelper = require("../utils/list_helper");
const mock_data = require("../utils/mock_data");
describe("total likes", () => {

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(mock_data.oneBlog);
    expect(result).toBe(2);
  });

  test("when list has more than one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(mock_data.blogs);
    expect(result).toBe(36);
  });

  test("when list is empty", () => {
    const result = listHelper.totalLikes(mock_data.emptyList);
    expect(result).toBe(0);
  });
});
