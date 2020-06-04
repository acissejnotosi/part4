const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const blogRouter = require('./controllers/blogs')
const logger = require("./utils/logger");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(
  middleware.morganLogger(
    ":method :url :status :res[content-length] - :response-time ms :body"
  )
);
app.use("/api/blogs", blogRouter)

module.exports = app;
