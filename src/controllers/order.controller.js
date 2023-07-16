const order = require('../model/order.model');
const orderDetails = require('../model/orderDetails.model');
const sequelize = require('../configs/db');
const {QueryTypes} = require('sequelize');
const {billNumber} = require('../helpers/randonBill')
// create data 
exports.create = async (req, res) => {
    const bill = billNumber()
    try {
        let message = [] ;
        const employee_id = req.payload.id
        const bill_number = bill
        const {order_qty,supllier_id,order_date,total_price} = req.body
        const item = req.body.item;
        for (let i = 0; i < item.length; i++) {
           await order.create({
            employee_id:employee_id,
            order_qty:order_qty,
            supllier_id:supllier_id,
            order_date:order_date,
            total_price:total_price,
            bill_number:bill_number
           }).then(async (data) =>{
            await orderDetails.create({
            order_id:data.id,
            bill_number:data.bill_number,
            product_id:item[i].product_id,
            order_qty:item[i].order_qty,
            total_price:item[i].total_price,
            status:item[i].status,
            order_details_date:item[i].order_details_date,
            }).then((data) => {
             message.push(data)
            })
           }).catch((error) => {
            console.log(error)
           }) 
        } 
        return res.status(200).json(message) 
    } catch (error) {
     return res.status(500).json({message:error.message})   
    }
}
// get all order
exports.get_all_order = async (req, res) =>{
 try {
    const {id} = req.params;
    const sql = `
     select DISTINCT ord.id,ordt.product_id,ordt.bill_number,pdt.name as type_name,ut.name as unit_name
     ,pt.name, ord.order_qty,ord.order_date,ordt.order_qty as qty_small,ordt.total_price as order_details_price,
     ordt.id as orderdetails_id,ord.total_price from orders ord 
     inner join orderdetails ordt on ord.id = ordt.order_id
     inner join products pt on ordt.product_id = pt.id
     inner join product_types pdt on pt.product_type_id = pdt.id
     inner join units ut on pt.unit_id = ut.id
     where ordt.bill_number = '${id}'
    `
    const data = await sequelize.query(sql,{type:QueryTypes.SELECT})
    if(data.length > 0) {
        return res.status(200).json(data)
    } else {
        return res.status(200).json(data)
    }
 } catch (error) {
  return res.status(500).json({message:error.message})  
 }
}