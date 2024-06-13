"use strict";
const { hashPassword } = require("../helpers/bcrypt.js");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let gadgets = require("../datas/gadgets.json").map((gadget) => {
      gadget.createdAt = new Date();
      gadget.updatedAt = new Date();
      return gadget;
    });
    await queryInterface.bulkInsert("Gadgets", gadgets);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Gadgets", null, {});
  },
};
