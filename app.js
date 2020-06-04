const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const Blog = require('./models/blog')

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(
  middleware.morganLogger(
    ":method :url :status :res[content-length] - :response-time ms :body"
  )
);

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  console.log(request.body);
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
