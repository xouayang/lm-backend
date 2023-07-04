const DataTypes = require("sequelize");
const sequelize = require("../configs/db");

const Unit = sequelize.define(
  "units",
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
    status:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("NOW()"),
    },
  },
  {
    sequelize,
  }
);

module.exports = Unit;
