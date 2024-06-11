"use strict";
const axios = require("axios");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get(
        `https://dragonball-api.com/api/characters`
      );
      console.log(response.data); // Log the response data to inspect its structure
    } catch (error) {
      console.error("Error fetching data from API: ", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DragonBalls", null, {});
  },
};
