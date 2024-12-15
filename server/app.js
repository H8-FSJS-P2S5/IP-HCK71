if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

const { errorHandler } = require("./middlewares/errorHandler.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./routers"));

app.use(errorHandler);

module.exports = app;
