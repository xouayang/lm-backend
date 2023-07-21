const customer = require("../../model/customer.model");
const employee = require("../../model/employee.model");
const Product = require('../../model/prduct.model')
const SaleDetail = require('../../model/sale_detail.model')
const sequelize = require("../../configs/db");
const { QueryTypes,Op } = require("sequelize");
// get all
exports.get_customer = async (req, res) => {
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
exports.get_employee = async (req, res) => {
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
exports.get_all_product = async (req, res) => {
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
// get product is on 
exports.product_finished = async (req, res) => {
  try {
    await product.findAll({
      where:{
        quatity:{[Op.lte]: 10} 
      }
    }).then((data) => {
      return res.status(200).json(data)
    }).catch((error) => {
      return res.status(200).json({message:error.message})
    })
  } catch (error) {
  return res.status(500).json({message:error.message})  
  }
}
// get top sale product
exports.top_sale_product = async (req, res) => {
  try {
    const sql = `
     select pdt.name as product_type_name,un.name as unit_name, pd.name,sdt.Sale_qty  from products pd 
     inner join sale_details sdt on pd.id = sdt.Pro_id
     inner join product_types pdt on pd.product_type_id = pdt.id
     inner join units un on pd.unit_id = un.id
     order by sdt.Sale_qty DESC LIMIT 10
    `
   const data = await sequelize.query(sql,{type:QueryTypes.SELECT}) 
   return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}
