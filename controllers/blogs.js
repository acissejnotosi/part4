const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if (typeof blog.title === "undefined" || typeof blog.url === "undefined") {
    response.status(400).json(result);
  }
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
