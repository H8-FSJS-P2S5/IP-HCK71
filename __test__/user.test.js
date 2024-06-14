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
