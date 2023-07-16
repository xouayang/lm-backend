const DataTypes = require("sequelize");
const sequelize = require("../configs/db");

const Exchange = sequelize.define(
  "exchanges",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bathtokip: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dollartokip: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Exchange;
