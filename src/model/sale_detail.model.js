const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");

const SaleDetail = sequelize.define(
  "sale_details",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Sale_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    Pro_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    Exch_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    Sale_detail_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Sale_qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Guanranteed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Date_expired: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Totalkip: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = SaleDetail;
