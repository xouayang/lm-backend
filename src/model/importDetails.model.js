const DataTypes = require("sequelize");
const sequelize = require("../configs/db");

const importDetails = sequelize.define(
  "import_details",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    pro_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    import_details_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    import_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    import_qty :{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = importDetails;
