const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const Sale = sequelize.define(
  "sales",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Em_id: {
      type: DataTypes.STRING,
      allowNull: true
      ,
    },
    Cus_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Sale_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Totalkip: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Totalbath: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = Sale;
