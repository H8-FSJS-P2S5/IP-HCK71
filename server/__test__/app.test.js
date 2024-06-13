// const request = require("supertest");
// const { test, expect, describe } = require("@jest/globals");
// const { app } = require("../app");

// let token;

// test("GET /", async () => {
//   let { body, status } = await request(app).get("/");
//   console.log({ body, status });

//   expect(status).toBe(200);
// });

// describe("POST /login", () => {
//   test("success login", async () => {
//     const response = await request(app)
//       .post("/login")
//       .send({ email: "user@example.com", password: "correctpassword" });
//     const { body, status } = response;
//     token = body.token;
//     expect(status).toBe(200);
//   });

//   test("fail login (no email)", async () => {
//     const response = await request(app)
//       .post("/login")
//       .send({ password: "correctpassword" });
//     const { body, status } = response;
//     expect(status).toBe(400);
//     expect(body).toBeInstanceOf(Object);
//     expect(body).toHaveProperty("message", "Validation error");
//   });

//   test("fail login (no password)", async () => {
//     const response = await request(app)
//       .post("/login")
//       .send({ email: "user@example.com" });
//     const { body, status } = response;
//     expect(status).toBe(400);
//     expect(body).toBeInstanceOf(Object);
//     expect(body).toHaveProperty("message", "Validation error");
//   });
// });

// describe("PUT /gadgets/:id", () => {
//   const edit = { name: "Iphone15" };
//   const validGadgetId = 1;
//   const invalidGadgetId = 50;

//   test("fail edit data (no login)", async () => {
//     const response = await request(app)
//       .put(`/gadgets/${validGadgetId}`)
//       .send(edit);
//     const { body, status } = response;
//     expect(status).toBe(401);
//     expect(body).toBeInstanceOf(Object);
//     expect(body).toHaveProperty("message", "Invalid token");
//   });

//   test("fail edit data (invalid token)", async () => {
//     const response = await request(app)
//       .put(`/gadgets/${validGadgetId}`)
//       .send(edit)
//       .set("Authorization", `Bearer WRONG_TOKEN`);
//     const { body, status } = response;
//     expect(status).toBe(401);
//     expect(body).toBeInstanceOf(Object);
//     expect(body).toHaveProperty("message", "Invalid token");
//   });
// });

// describe("GET /pub/gadgets", () => {
//   test("success get data", async () => {
//     const response = await request(app).get("/pub/gadgets");
//     const { body, status } = response;
//     expect(status).toBe(200);
//     expect(body).toBeInstanceOf(Array);
//     expect(body[0]).toBeInstanceOf(Object);
//     expect(body[0]).toHaveProperty("name");
//     expect(body[0]).toHaveProperty("description");
//     expect(body[0]).toHaveProperty("price");
//     expect(body[0]).toHaveProperty("imgUrl");
//     expect(body[0]).toHaveProperty("categoryId");
//     expect(body[0]).toHaveProperty("authorId");
//   });

//   test("success get data (pagination to correct data length)", async () => {
//     const response = await request(app).get("/pub/gadgets?filter=1");
//     const { body, status } = response;
//     expect(status).toBe(200);
//     expect(body).toBeInstanceOf(Array);
//     expect(body.length).toBe(10);
//     expect(body[0]).toBeInstanceOf(Object);
//     expect(body[0]).toHaveProperty("name");
//     expect(body[0]).toHaveProperty("description");
//     expect(body[0]).toHaveProperty("price");
//     expect(body[0]).toHaveProperty("imgUrl");
//     expect(body[0]).toHaveProperty("categoryId");
//     expect(body[0]).toHaveProperty("authorId");
//     expect(body[0].Category.id).toBe(1);
//   });
// });

// describe("GET /pub/gadgets/:id", () => {
//   const validGadgetId = 10;
//   const invalidGadgetId = 50;

//   test("success get data", async () => {
//     const response = await request(app).get(`/pub/gadgets/${validGadgetId}`);
//     const { body, status } = response;
//     expect(status).toBe(200);
//     expect(body).toBeInstanceOf(Object);
//     expect(body).toHaveProperty("name");
//     expect(body).toHaveProperty("description");
//     expect(body).toHaveProperty("price");
//     expect(body).toHaveProperty("imgUrl");
//     expect(body).toHaveProperty("categoryId");
//     expect(body).toHaveProperty("authorId");
//   });

//   test("fail get data (data not found)", async () => {
//     const response = await request(app).get(`/pub/gadgets/${invalidGadgetId}`);
//     const { body, status } = response;
//     expect(status).toBe(404);
//     expect(body).toBeInstanceOf(Object);
//     expect(body).toHaveProperty(
//       "message",
//       `Gadget with ID ${invalidGadgetId} not found`
//     );
//   });
// });
