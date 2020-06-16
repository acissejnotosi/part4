const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.status(200).json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const saltRounds = 10;

  if (
    typeof body.username !== "undefined" ||
    typeof body.passwordHash !== "undefined"
  ) {
    const passwordHash = await bcrypt.hash(body.passwordHash, saltRounds);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } else {
    response.status(400).end();
  }
});

module.exports = usersRouter;
