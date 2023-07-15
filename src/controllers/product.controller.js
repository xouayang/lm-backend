const Product = require('../model/prduct.model');
const {billNumber} = require('../helpers/randonBill')
const sequelize = require('../configs/db')
const {QueryTypes} = require('sequelize')
// create 
exports.create = async (req, res) => {
    const barcodes = billNumber()
    try {
      await Product.create({...req.body,barcode:barcodes}).then((data) => {
        if(data) {
            return res.status(201).json(data)
        }
      }).catch((error) =>{
        return res.status(404).json({message:error.message})
      })  
    } catch (error) {
      console.log(error)
     return res.status(500).json({message:error.message})   
    }
}
// get all data 
exports.get_all = async (req ,res) => {
    try {
      const sql = `
       select pt.id, pt.name,pt.quatity,pt.sale_price,pt.barcode,
       pt.barcode,pt.price,pt.createdAt,pdt.name as product_type_name,
       un.name as unit_name,sp.name as supplier_name,sp.address,sp.tel from products pt 
       inner join product_types pdt on pt.product_type_id = pdt.id
       inner join units un on pt.unit_id = un.id 
       inner join suppliers sp on pt.supplier_id = sp.id
       order by pt.quatity ASC
      `  
      const data = await sequelize.query(sql,{type:QueryTypes.SELECT})
      if(data) {
        return res.status(200).json(data)
      } else {
        return res.status(200).json(data)
      }
    } catch (error) {
      return res.status(500).json({message:error.message})  
    }
}
// update product 
exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        await Product.update({...req.body}, {where:{id:id}})
        .then((updated) => {
            if(updated) {
                return res.status(200).json({message:"updated"})
            }
        }).catch((error) => {
            return res.status(404).json({message:error.message})
        })
         
    } catch (error) {
    return res.status(500).json({message:error.message})    
    }
}
// delete data 
exports.deleteProduct = async (req,res) => {
    try {
        const {id} = req.params
        await Product.destroy({where:{id:id}})
        .then((deleted) => {
            if(deleted) {
                return res.status(200).json({message:"deleted"})
            }
        }).catch((error) => {
            return res.status(404).json({message:error.message})
        })  
    } catch (error) {
        return res.status(500).json({message:error.message})       
    }
}