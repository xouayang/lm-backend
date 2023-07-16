const DataTypes = require("sequelize");
const sequelize = require("../configs/db");

const Orders = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    order_qty:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull:false
    },
    supllier_id:{
        type:DataTypes.UUID,
        allowNull:false
    },
    order_date:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:sequelize.literal("NOW()")
    },
    bill_number:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    total_price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:1
    }
  },
  {
    sequelize,
    timestamps:true
  }
);

module.exports = Orders;
