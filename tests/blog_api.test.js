const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);
const test_helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(test_helper.blogs[0]);
  await blogObject.save();

  blogObject = new Blog(test_helper.blogs[1]);
  await blogObject.save();

  blogObject = new Blog(test_helper.blogs[2]);
  await blogObject.save();

  blogObject = new Blog(test_helper.blogs[3]);
  await blogObject.save();

  blogObject = new Blog(test_helper.blogs[4]);
  await blogObject.save();

  blogObject = new Blog(test_helper.blogs[5]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(test_helper.blogs.length);
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
  console.log(newBlog.id);
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

afterAll(() => {
  mongoose.connection.close();
});
