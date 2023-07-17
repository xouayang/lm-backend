const customer = require("../../model/customer.model");
const employee = require("../../model/employee.model");
const sequelize = require("../../configs/db");
const { QueryTypes } = require("sequelize");
exports.search_customer = async (req, res) => {
    try {
      await customer
        .findAll()
        .then((data) => {
          if (data.length > 0) {
            return res.status(200).json(data);
          }
        })
        .catch((error) => {
          return res.status(200).json({ message: error.message });
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  exports.search_employee = async (req, res) => {
    try {
      await employee
        .findAll()
        .then((data) => {
          if (data.length > 0) {
            return res.status(200).json(data);
          }
        })
        .catch((error) => {
          return res.status(200).json({ message: error.message });
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  //
  exports.search_product = async (req, res) => {
    try {
      const sql = `
         select pd.name, pd.quatity as all_quatity,pd.sale_price,pd.price,
          pdt.name as product_type_name,pdt.created_at
          from products pd 
         inner join product_types pdt on pd.product_type_id = pdt.id
      `;
      const data = await sequelize.query(sql,{type:QueryTypes.SELECT});
      if(data.length > 0) {
        return res.status(200).json(data)
      } else {
        return res.status(200).json(data)
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };