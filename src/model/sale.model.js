const { DataTypes } = require("sequelize");
const sequelize = require("../configs/db");
const Customer = require("./customer.model"); 
const Employee = require("./employee.model"); 

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
      allowNull: true,
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
    Totaldollar: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

Sale.belongsTo(Customer, { foreignKey: "Cus_id", as: "customer" }); // Associate Sale with Customer
Sale.belongsTo(Employee, { foreignKey: "Em_id", as: "employee" }); // Associate Sale with Employee
module.exports = Sale;
