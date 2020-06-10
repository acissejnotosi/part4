const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const test_helper = require("./test_helper");
const logger = require("../utils/logger");

beforeEach(async () => {
  await Blog.deleteMany({});
  logger.info("cleared");
  test_helper.blogs.forEach(async (blog) => {
    let blogObject = new Blog(blog);
    await blogObject.save();
  });
  logger.info("done");
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(test_helper.blogs.length).toBe(response.body.length);
});

test("Verifies that the unique identifier property of the blog posts is named id", async () => {
  const newBlog = new Blog({
    title: "test",
    author: "test",
    url: "test",
    likes: 1,
  });
  await newBlog.save();
  await newBlog.remove();
  expect(newBlog.id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = new Blog({
    title: "test",
    author: "test",
    url: "test",
    likes: 1,
  });

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await test_helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(test_helper.blogs.length + 1);
  const contents = blogsAtEnd.map((n) => {
    return { title: n.title, author: n.author, url: n.url, likes: n.likes };
  });
  expect(contents).toContainEqual({
    title: "test",
    author: "test",
    url: "test",
    likes: 1,
  });
});

test("Blog without likes are added with 0 likes by default", async () => {
  const newBlog = new Blog({
    title: "test",
    author: "test",
    url: "test",
  });

  await api.post("/api/blogs").send(newBlog).expect(201);

  const blogsAtEnd = await test_helper.blogsInDb();
  const contents = blogsAtEnd.map((n) => {
    return { title: n.title, author: n.author, url: n.url, likes: n.likes };
  });
  expect(contents).toContainEqual({
    title: "test",
    author: "test",
    url: "test",
    likes: 0,
  });
});

test("Title and url are missing from request, it should return 400 Bad Request", async () => {
  const newBlog = new Blog({
    author: "test",
    likes: 2,
  });
  await api.post("/api/blogs").send(newBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
