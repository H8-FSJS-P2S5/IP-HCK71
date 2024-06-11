"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email Already Exist",
        },

        validate: {
          notEmpty: {
            args: true,
            msg: "Emaill cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Email cannot be null",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format ",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password cannot be empty",
          },
          notNull: {
            args: true,
            msg: "Password cannot be null",
          },
          len: {
            args: [5],
            msg: "Password must be at least 5 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
