const { User } = require("../models");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: "M@a",
        name: "Malika",
        password: await bcrypt.hash("123", 10),
        isAdmin: true,
      },
      {
        email: "ypliskovsky",
        name: "Yura",
        password: await bcrypt.hash("123", 10),
        isAdmin: false,
      },
      {
        email: "amakarova",
        name: "Anya",
        password: await bcrypt.hash("123", 10),
        isAdmin: false,
      },
      {
        email: "abashkatov",
        name: "Anatoly",
        password: await bcrypt.hash("123", 10),
        isAdmin: false,
      },
      {
        email: "vponomarenko",
        name: "Vlad",
        password: await bcrypt.hash("123", 10),
        isAdmin: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ truncate: { cascade: true } });
  },
};
