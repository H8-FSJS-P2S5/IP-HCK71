"use strict";
const { hashPassword } = require("../helpers/bcrypt.js");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = require("../datas/users.json").map((user) => {
      user.password = hashPassword(user.password);
      user.createdAt = new Date();
      user.updatedAt = new Date();
      return user;
    });
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
