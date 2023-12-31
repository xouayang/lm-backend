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
       select pt.id, pt.name,pt.quatity,pt.sale_price,pt.barcode, pt.profile,
       pt.barcode,pt.price,pt.createdAt,pdt.name as product_type_name,pdt.id as product_type_id,
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
};

// subtract quantity
exports.subtractQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Retrieve the product
    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the requested quantity is greater than the available quantity
    if (quantity > product.quatity) {
      return res.status(400).json({ message: 'Requested quantity exceeds available quantity' });
    }

    // Subtract the quantity
    const updatedQuantity = product.quatity - quantity;

    // Update the product with the new quantity
    await Product.update({ quatity: updatedQuantity }, { where: { id } });

    return res.status(200).json({ message: 'Quantity subtracted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get products almost out of stock (quantity between 0 to 10) along with count
exports.get_almost_out_of_stock_products = async (req, res) => {
  try {
    const sqlProducts = `
      SELECT pt.id, pt.name, pt.quatity, pt.sale_price, pt.barcode, pt.profile,
      pt.barcode, pt.price, pt.createdAt, pdt.name AS product_type_name,
      un.name AS unit_name, sp.name AS supplier_name, sp.address, sp.tel
      FROM products pt 
      INNER JOIN product_types pdt ON pt.product_type_id = pdt.id
      INNER JOIN units un ON pt.unit_id = un.id 
      INNER JOIN suppliers sp ON pt.supplier_id = sp.id
      WHERE pt.quatity BETWEEN 0 AND 10
      ORDER BY pt.quatity ASC
    `;
    const dataProducts = await sequelize.query(sqlProducts, { type: QueryTypes.SELECT });

    const sqlCount = `
      SELECT COUNT(*) AS count
      FROM products
      WHERE quatity BETWEEN 0 AND 10
    `;
    const dataCount = await sequelize.query(sqlCount, { type: QueryTypes.SELECT });

    const count = dataCount[0].count;

    return res.status(200).json({ count, products: dataProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};