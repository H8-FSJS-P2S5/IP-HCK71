const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  try {
    await User.create({
      email: "kylie@mail.com",
      password: "123456",
    });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await User.destroy({
    where: {
      email: "kylie@mail.com",
    },
  });
});

describe("Login Test", () => {
  test("Login Success", async () => {
    const response = await request(app).post("/login").send({
      email: "kylie@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});

describe("Register Test", () => {
  test("Register Success", async () => {
    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "testuser@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Register Success");
    expect(response.body).toHaveProperty("email", "testuser@mail.com");
  });

  test("Register Fail - Email Already Exists", async () => {
    await User.create({
      username: "duplicateuser",
      email: "duplicate@mail.com",
      password: bcrypt.hashSync("123456", 10),
    });

    const response = await request(app).post("/register").send({
      username: "newuser",
      email: "duplicate@mail.com",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email Already Exist");
  });

  test("Register Fail - Validation Error", async () => {
    const response = await request(app).post("/register").send({
      username: "testuser",
      email: "invalidemail",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});

let token;

beforeAll(async () => {
  try {
    // Reset the database
    await User.sync({ force: true });
    await DragonBall.sync({ force: true });

    // Create a test user
    const user = await User.create({
      username: "testuser",
      email: "testuser@mail.com",
      password: bcrypt.hashSync("123456", 10),
    });

    // Generate a token
    token = jwt.sign({ id: user.id, email: user.email }, "secret");

    await DragonBall.create({ name: "Dragon Ball 1" });
    await DragonBall.create({ name: "Dragon Ball 2" });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await User.destroy({ where: {}, truncate: true });
  await DragonBall.destroy({ where: {}, truncate: true });
});

describe("DragonBalls Endpoint Test", () => {
  test("Get Dragon Balls - Success", async () => {
    const response = await request(app)
      .get("/dragonBalls")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBe(2);
    response.body.forEach((item) => {
      expect(item).toHaveProperty("name");
      expect(item).not.toHaveProperty("createdAt");
      expect(item).not.toHaveProperty("updatedAt");
    });
  });

  test("Get Dragon Balls - Unauthorized", async () => {
    const response = await request(app).get("/dragonBalls");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid token");
  });
});
