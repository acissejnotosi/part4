const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const api = supertest(app);
const test_helper = require("./test_helper");
const logger = require("../utils/logger");

describe("Test GET .../api/users requests", () => {
  test("Users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    logger.info("cleared");
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name:"root", passwordHash });
    await user.save();
    logger.info("saved");
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await test_helper.usersInDb();
    const newUser = {
      username: "user1",
      name: "user1",
      passwordHash: "sasasa",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await test_helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("when the user is invalid", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    logger.info("cleared");
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name:"root", passwordHash });
    await user.save();
    logger.info("saved");
  });

  test("creation not succeeds if password and username is not provided ", async () => {
    const newUser = {
      name: "user1",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);
  });

  test("creation not succeeds if username is not unique", async () => {
    const newUser = {
      username: "root",
      name: "root",
      passwordHash: "root"
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);  
  });

  test("creation not succeeds if username and password length is smaller than 3", async () => {
    const newUser = {
      username: "ro",
      name: "root",
      passwordHash: "ro"
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);  
  });
});

afterAll(() => {
  mongoose.connection.close();
});
