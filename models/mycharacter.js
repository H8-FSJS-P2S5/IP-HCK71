"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyCharacter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyCharacter.belongsTo(models.User, { foreignKey: "UserId" });
      MyCharacter.hasMany(models.DragonBall, { foreignKey: "DragonBallId" });
    }
  }
  MyCharacter.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "User ID cannot be empty",
          },
          notNull: {
            args: true,
            msg: "User ID cannot be null",
          },
        },
      },
      DragonBallId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: " ID cannot be empty",
          },
          notNull: {
            args: true,
            msg: " ID cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "MyCharacter",
    }
  );
  return MyCharacter;
};
