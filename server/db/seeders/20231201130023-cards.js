const { Card } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Card.bulkCreate([
      {
        artist: 'Jeon Soyeon',
        img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/20230905_%28G%29i-dle%27s_Soyeon_04.png',
        price: 100,
      },
      {
        artist: 'Miyeon',
        img: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Cho_Mi-yeon_at_SBS_Radio_on_August%2C6_2020_01.png',
        price: 110,
      },
      {
        artist: 'Minnie',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/%28G%29I-DLE%27s_Minnie_on_June_2023.jpg/1280px-%28G%29I-DLE%27s_Minnie_on_June_2023.jpg',
        price: 115,
      },
      {
        artist: 'Soojin',
        img: 'https://res.heraldm.com/content/image/2023/10/26/20231026000566_0.jpg',
        price: 120,
      },
      {
        artist: 'Yuqi',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/20230630_Song_Yu-qi.jpg/800px-20230630_Song_Yu-qi.jpg',
        price: 125,
      },
      {
        artist: 'Shuhua',
        img: 'https://image.kpopmap.com/2019/02/shuhua_profile_s_0607.jpg',
        price: 130,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Card.destroy({ truncate: { cascade: true } });
  },
};
