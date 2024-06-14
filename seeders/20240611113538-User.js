"use strict";

const { hashedPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = [
      {
        username: "User1",
        email: "user1@mail.com",
        password: "123456",
      },
      {
        username: "User2",
        email: "user2@mail.com",
        password: "123456",
      },
    ].map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashedPassword(el.password);
      return el;
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
