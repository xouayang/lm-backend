const DataTypes = require("sequelize");
const sequelize = require("../configs/db");

const imports = sequelize.define(
  "imports",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    import_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    import_quaty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    import_total_kip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    import_staus:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:2
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = imports;
