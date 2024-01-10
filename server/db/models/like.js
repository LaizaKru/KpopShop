"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Card }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Card, { foreignKey: "cardId" });
      // define association here
    }
  }
  Like.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Cards", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
