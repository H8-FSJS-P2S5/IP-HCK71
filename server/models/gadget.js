"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gadget extends Model {
    static associate(models) {
      Gadget.belongsTo(models.User, { foreignKey: "authorId" });
      Gadget.belongsTo(models.Category, { foreignKey: "categoryId" });
      Gadget.hasMany(models.Cart, { foreignKey: "cartId" });
    }
  }
  Gadget.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description is required",
          },
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
          min: {
            args: 5000,
            msg: "Minimum price is 5000",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL is required",
          },
          notEmpty: {
            msg: "Image URL is required",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL is required",
          },
          notEmpty: {
            msg: "Image URL is required",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL is required",
          },
          notEmpty: {
            msg: "Image URL is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Gadget",
    }
  );
  return Gadget;
};
