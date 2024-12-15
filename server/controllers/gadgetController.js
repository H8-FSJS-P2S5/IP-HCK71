const { Gadget, User, Category } = require("../models/index.js");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt.js");
const { createToken } = require("../helpers/jsonwebtoken.js");
const { authentication } = require("../middlewares/authentication.js");

class GadgetController {
  static async addUser(req, res, next) {
    try {
      res.json;
      await User.create(req.body);
      const newUser = await User.findOne({
        where: {
          email: req.body.email,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailEmpty" };
      if (!password) throw { name: "PassEmpty" };
      const oneUser = await User.findOne({ where: { email } });
      if (!oneUser) throw { name: "InvalidLogin" };
      const checkUser = comparePassword(password, oneUser.password);
      if (!checkUser) throw { name: "InvalidLogin" };
      const token = createToken({ id: oneUser.id });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { OAuth2Client } = require("google-auth-library");
      const client = new OAuth2Client();

      const { googletoken } = req.headers;

      const ticket = await client.verifyIdToken({
        idToken: googletoken,
        audience:
          "40611180233-8pcoesdsqv3a6eune8bm75t0aip6bumu.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();

      let user = await User.findOne({ where: { email: payload.email } });

      if (!user) {
        user = await User.create(
          {
            email: payload.email,
            password: "testdong",
          },
          {
            hooks: false,
          }
        );
      }

      const access_token = createToken({ id: user.id });

      res
        .status(200)
        .json({ message: "Google login success", access_token, payload, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async showGadgetPub(req, res, next) {
    try {
      const { sort, filter, page, search } = req.query;
      let options = {
        include: {
          model: Category,
          where: {},
        },
      };
      if (filter) options.include.where.id = filter;
      if (search) options.where = { name: { [Op.iLike]: `%${search}%` } };
      if (sort === "asc") options.order = [["id", "ASC"]];
      if (sort === "desc") options.order = [["id", "DESC"]];

      let limit = 10;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = parseInt(page.size);
          options.limit = limit;
        }
        if (page.number) {
          pageNumber = parseInt(page.number);
          options.offset = limit * (pageNumber - 1);
        }
      }
      let { count, rows } = await Gadget.findAndCountAll(options);
      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showOneGadgetPub(req, res, next) {
    try {
      const oneGadget = await Gadget.findByPk(req.params.id);
      if (!oneGadget) throw { name: "GadgetNotFound", id: req.params.id };
      res.status(200).json(oneGadget);
    } catch (error) {
      next(error);
    }
  }

  static async showAllGadget(req, res, next) {
    try {
      const allGadget = await Gadget.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Category,
          },
        ],
      });
      res.status(200).json(allGadget);
    } catch (error) {
      next(error);
    }
  }

  static async showOneGadget(req, res, next) {
    try {
      const oneGadget = await Gadget.findByPk(req.params.id);
      if (!oneGadget) throw { name: "GadgetNotFound", id: req.params.id };
      res.status(200).json(oneGadget);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { GadgetController };
