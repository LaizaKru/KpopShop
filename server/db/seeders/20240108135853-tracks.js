const { Track } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Track.bulkCreate([
      {
        group: "GI-DLE",
        url: "/GI-DLE(2).mp3",
      },
      {
        group: "Twice",
        url: "/TWICE.mp3",
      },
      {
        group: "GI-DLE",
        url: "/GI-DLE(3).mp3",
      },
      {
        group: "BLACKPINK",
        url: "/BLACKPINK.mp3",
      },
      {
        group: "GI-DLE",
        url: "/GI-DLE.mp3",
      },
      {
        group: "BTS",
        url: "/BTS.mp3",
      },
      {
        group: "GI-DLE",
        url: "/GI-DLE(4).mp3",
      },
      {
        group: "BLACKPINK",
        url: "/BLACKPINK(2).mp3",
      },
      {
        group: "BTS",
        url: "/BTS(2).mp3",
      },
      {
        group: "GI-DLE",
        url: "/GI-DLE(5).mp3",
      },
      {
        group: "BLACKPINK",
        url: "/BLACKPINK(3).mp3",
      },
      {
        group: "GI-DLE",
        url: "/GI-DLE(6).mp3",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Track.destroy({ truncate: { cascade: true } });
  },
};
