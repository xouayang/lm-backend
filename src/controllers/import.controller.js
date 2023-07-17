const imports = require("../model/import.model");
const importDetails = require("../model/importDetails.model");
const product = require('../model/prduct.model');
const sequelize = require('../configs/db');
const order = require('../model/order.model')
const {QueryTypes} = require('sequelize');
exports.create_import = async (req, res) => {
  try {
    let result=[]
    let order_update_id;
    const employee_id = req.payload.id
    const {
      order_id,
      import_date,
      import_quaty,
      import_total_kip,
    } = req.body;
    const item = req.body.item;
    for (let i = 0; i < item.length; i++) {
      await product.increment("quatity", {
        by: item[i].quatity,
        where: {
          id: item[i].pro_id,
        },
      });
      await imports
        .create({
          order_id: order_id,
          employee_id: employee_id,
          import_date: import_date,
          import_quaty: import_quaty,
          import_total_kip: import_total_kip,
        })
        .then(async (data) => {
            order_update_id = data.order_id
          await importDetails.create({
            import_id: data.id,
            import_details_date: item[i].import_details_date,
            pro_id: item[i].pro_id,
            import_qty: item[i].import_qty,
            total_price: item[i].total_price,
          }).then((data) => {
            result.push(data)
          }).catch((error) => {
            console.log({message:error.message})
          })
        });
    }
    await order.update({status:0}, {where:{id:order_update_id}})
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get history of imports
exports.get_history = async (req, res) => {
    try {
     const sql = `
       select DISTINCT ip.id , ip.import_quaty as total_quaty,
       ip.import_total_kip,
       ip.import_date,ipd.import_qty as details_qty,ipd.total_price
        from imports ip 
       inner join import_details ipd on ip.id = ipd.import_id
       `
    const data = await sequelize.query(sql,{type:QueryTypes.SELECT})    
    if(data.length > 0) {
        return res.status(200).json(data);
    } else {
        return res.status(200).json("Error");
    }
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}
