"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DragonBall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DragonBall.hasMany(models.MyCharacter, { foreignKey: "DragonBallId" });
    }
  }
  DragonBall.init(
    {
      name: DataTypes.STRING,
      ki: DataTypes.STRING,
      maxKi: DataTypes.STRING,
      race: DataTypes.STRING,
      gender: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      affiliation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DragonBall",
    }
  );
  return DragonBall;
};
