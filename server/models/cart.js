"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: "authorId" });
      Cart.belongsTo(models.Gadget, { foreignKey: "gadgetId" });
    }
  }
  Cart.init(
    {
      gadgetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
/**
 * user -> cart <- gadget <- categories
user one to many ke cart
gadget one to many ke cart
categories one to many ke gadget

 */
