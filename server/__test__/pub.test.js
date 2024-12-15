const request = require("supertest");
const app = require("../app");

const { sequelize, Category } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

const user1 = {
  email: "galgadot@mail.com",
  password: "galgadot",
};

const categories = {
  name: "Phone",
};

beforeAll(async () => {
  try {
    // Insert user data
    await queryInterface.bulkInsert("Users", [
      {
        email: user1.email,
        password: hashPassword(user1.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.error("Error inserting user data:", error);
  }

  // Insert category data
  try {
    await Category.create(categories);
  } catch (error) {
    console.error("Error inserting category data:", error);
  }

  // Insert gadgets data
  let dataGadgets = require("../datas/gadgets.json");
  try {
    await queryInterface.bulkInsert(
      "Gadgets",
      dataGadgets.map((el) => ({
        ...el,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
    console.log("Gadgets data inserted successfully");
  } catch (error) {
    console.error("Error inserting gadgets data:", error);
  }
});

afterAll(async () => {
  try {
    // Clean up the data
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Gadgets", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
});

let id = 1;

describe("GET /pub/gadgets", () => {
  describe("Success", () => {
    test("get data pub", async () => {
      let { body, status } = await request(app).get("/pub/gadgets");
      expect(status).toBe(200);
    });
    test("get data pub filter query", async () => {
      let { body, status } = await request(app).get("/pub/gadgets?sort=name");
      expect(status).toBe(200);
    });
    test("get data pub", async () => {
      let { body, status } = await request(app).get(
        "/pub/gadgets?page[size]=10&page[number]=1"
      );
      expect(status).toBe(200);
      expect(body.data).toHaveLength(10);
    });
  });
});

describe("GET /pub/gadgets/:id", () => {
  describe("Success", () => {
    test("get data by id", async () => {
      let { body, status } = await request(app).get(`/pub/gadgets/${id}`);
      expect(status).toBe(200);
    });
  });
  describe("Failed", () => {
    test("data not found", async () => {
      let { body, status } = await request(app).get(`/pub/gadgets/${30}`);
      expect(status).toBe(404);
    });
  });
});
