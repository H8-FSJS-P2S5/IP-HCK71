"use strict";
const axios = require("axios");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { data } = await axios.get(`https://dragonball-api.com/api/planets`);

    // console.log(data);

    //     npx sequelize-cli model:generate --name Planet --attributes name:string
    // ,isDestroyed:boolean,description:string,image:string

    let dbz = data.items.map(({ name, isDestroyed, description, image }) => {
      return {
        name,
        isDestroyed,
        description,
        image,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Planets", dbz, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Planets", null, {});
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
