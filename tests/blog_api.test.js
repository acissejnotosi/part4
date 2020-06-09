const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require('../models/blog')
const api = supertest(app);
const mock_data = require('../utils/mock_data');

beforeEach(async () => {
  await Blog.deleteMany({});

  let noteObject = new Blog(mock_data.blogs[0]);
  await noteObject.save();

  noteObject = new Blog(mock_data.blogs[1]);
  await noteObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body.length).toBe(2);
});

test("Verifies that the unique identifier property of the blog posts is named id", async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()
  console.log(blog.id);
  expect(blog.id).toBeDefined();
})

afterAll(() => {
  mongoose.connection.close();
});
