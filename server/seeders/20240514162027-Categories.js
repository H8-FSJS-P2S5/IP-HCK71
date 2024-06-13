"use strict";
const { hashPassword } = require("../helpers/bcrypt.js");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let categories = require("../datas/categories.json").map((category) => {
      category.createdAt = new Date();
      category.updatedAt = new Date();
      return category;
    });
    await queryInterface.bulkInsert("Categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
