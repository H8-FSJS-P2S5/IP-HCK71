const express = require("express");
const app = express();
const port = 3000;

const { User } = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  try {
  } catch (error) {}
});

app.post("/login", (req, res) => {
  try {
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
