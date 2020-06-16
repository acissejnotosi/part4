const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  if (typeof body.title === "undefined" || typeof body.url === "undefined") {
    response.status(400).end();
  }
  console.log(body.userId);
  const user = await User.findById(body.userId)
  console.log(user);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes, 
    user: user._id
  })

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  console.log(body.id);
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
