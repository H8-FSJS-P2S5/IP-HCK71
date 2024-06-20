if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const { User, DragonBall, MyCharacter, Planet } = require("./models");
const { OAuth2Client } = require("google-auth-library");
const { where } = require("sequelize");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    let { username, email, password } = req.body;

    const user = await User.create({
      username,
      email,
      password,
    });
    // console.log(user);

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
  const user = req.user;
  const dragonBalls = await DragonBall.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.status(200).json(dragonBalls);
});

app.get("/dragonBalls/:id", authentication, async (req, res) => {
  try {
    const { id } = req.params;
    const dragonBall = await DragonBall.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dragonBall) {
      return res.status(404).json({ message: "Dragon Ball not found" });
    }

    res.status(200).json(dragonBall);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/mc", authentication, async (req, res) => {
  const UserId = req.user.id;
  const mc = await MyCharacter.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      UserId,
    },
    include: [DragonBall],
  });
  res.status(200).json(mc);
});

app.get("/planets", authentication, async (req, res) => {
  const user = req.user;
  const planet = await Planet.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.status(200).json(planet);
});

app.post("/mc/:id", authentication, async (req, res) => {
  try {
    // console.log(req.body);
    // let { name, ki, maxKi, race, gender, description, image, affiliation } =
    //   req.body;
    const user = req.user;

    req.body.UserId = user.id;
    const myCharacter = await MyCharacter.create({
      UserId: user.id,
      DragonBallId: req.params.id,
    });
    res.status(201).json(myCharacter);
  } catch (error) {
    // console.log(error);
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({
        message: error.errors[0].message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
});

async function guardAuthorOnly(req, res, next) {
  try {
    const user = req.user;
    const mc = await MyCharacter.findByPk(req.params.id);

    if (!mc) {
      return res.status(404).json({
        message: "My Ch..... not found",
      });
    }
    // console.log({ user, mc });
    if (mc.UserId !== user.id) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
    req.mc = mc;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

app.delete("/mc/:id", authentication, guardAuthorOnly, async (req, res) => {
  try {
    // const user = req.user;
    // const { data } = await axios({
    //   method: "DELETE",
    //   url: "https://dragonball-api.com/api/characters/delete",
    // });
    // const data
    await MyCharacter.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ message: "My Dragon Ball Character has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.patch("/mc/:id", authentication, guardAuthorOnly, async (req, res) => {
  try {
    let mc = await MyCharacter.findByPk(req.params.id);
    console.log(mc);
    await MyCharacter.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res
      .status(200)
      .json({ message: "My Dragon Ball Character has been update" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/pub/dragonBalls", async (req, res) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://dragonball-api.com/api/characters",
    });
    // console.log(data.items);
    res.status(200).json(data.items);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//AI

app.post("/ai", async (req, res, next) => {
  try {
    // Fungsi asinkron untuk menjalankan model generatif
    async function run() {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      let question = req.body.question;
      const prompt = question;

      const result = await model.generateContent(prompt);
      // console.log(result);
      const response = await result.response;
      const text = await response.text(); // Menggunakan await untuk mendapatkan teks

      // console.log(text);
      return text;
    }

    // Memanggil fungsi run dan mengirimkan respon
    const answer = await run();
    res.send({ answer });
  } catch (error) {
    // Menangani error jika terjadi
    console.error(error);
    res
      .status(500)
      .send({ error: "Terjadi kesalahan saat memproses permintaan." });
  }
});

app.post("/google-login", async (req, res, next) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const { google_token } = req.headers;

    if (!google_token) {
      return res.status(400).json({ error: "Google token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      user = await User.create(
        {
          email: payload.email,
          password: "123456", // Ensure this is a placeholder and implement proper password handling
        },
        {
          hooks: false,
        }
      );
    }

    const access_token = jwt.sign({ id: user.id }, "secret");

    res
      .status(200)
      .json({ message: "Google login success", access_token, payload, user });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app;
