const express = require("express");
const app = express();
const port = 3000;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const { User, DragonBall } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    let { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password,
    });
    console.log(user);

    res.status(201).json({ message: "Register Success", email: user.email });
  } catch (error) {
    if (
      error.name === "SequelizeUniqueConstraintError" ||
      error.name === "SequelizeValidationError"
    ) {
      res.status(400).json({
        message: error.errors[0].message,
      });
    } else {
      res.status(500).json({
        message: "Internal Server error",
      });
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email/password",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid email/password",
      });
    }

    res.status(200).json({
      access_token: jwt.sign({ id: user.id }, "secret"),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const token = bearerToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    const payload = jwt.verify(token, "secret");
    const user = await User.findByPk(payload.id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

app.get("/dragonBalls", authentication, async (req, res) => {
  try {
    const user = req.user;
    const { data } = await axios({
      where: {
        UserId: user.id,
      },
      method: "GET",
      url: "https://dragonball-api.com/api/characters",
    });
    // console.log(data.items);
    res.json(data.items);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app;
