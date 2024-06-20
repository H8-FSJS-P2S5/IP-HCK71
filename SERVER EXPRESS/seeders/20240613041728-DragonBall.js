"use strict";
const axios = require("axios");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { data } = await axios.get(
      `https://dragonball-api.com/api/characters`
    );

    // console.log(data);

    let dbz = data.items.map(
      ({ name, ki, maxKi, race, gender, description, image, affiliation }) => {
        return {
          name,
          ki,
          maxKi,
          race,
          gender,
          description,
          image,
          affiliation,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    );

    await queryInterface.bulkInsert("DragonBalls", dbz, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DragonBalls", null, {});
  },
};

// "use strict";
// const bcryptjs = require("bcryptjs");
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {

//     await queryInterface.bulkInsert("Users", [
//       {
//         email: "lili@gmail.com",
//         password: bcrypt.hashSync("1234"),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     ] {});
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete("Users", null, {});
//   },
// };
