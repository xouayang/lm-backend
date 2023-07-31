const { Op } = require('sequelize');
const SaleDetail = require('../model/sale_detail.model');
const Product = require('../model/prduct.model');
const sequelize = require('../configs/db');
const ProductType = require('../model/productType.model'); // Import the ProductType model

// _________________________select top sell product of month___________________
exports.getSaleDetailSummaryByMonthOfYear = async (req, res) => {
  try {
    const { year, month, limit } = req.query;

    const startDate = new Date(year, month - 1, 1); // Note: JavaScript months are zero-based
    const endDate = new Date(year, month, 0);

    const summary = await SaleDetail.findAll({
      attributes: [
        'Pro_id',
        [
          sequelize.fn('SUM', sequelize.col('Sale_qty')),
          'totalQuantity'
        ],
        [
          sequelize.fn('SUM', sequelize.col('Totalkip')),
          'totalSalePrice'
        ],
      ],
      group: ['Pro_id'],
      order: [
        [sequelize.literal('totalQuantity'), 'DESC']
      ],
      limit: parseInt(limit, 10),
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
          as: 'product',
        },
      ],
      where: {
        [Op.and]: [
          { Sale_detail_date: { [Op.between]: [startDate, endDate] } },
        ],
      },
    });

    // if (summary.length === 0) {
    //   return res.status(404).json({ message: 'No sale details found for the given month and year' });
    // }

    const result = summary.map((row) => {
      const { Pro_id, totalQuantity, totalSalePrice, product } = row.toJSON();

      const productName = product ? product.name : 'Product Not Found';

      return {
        product_id: Pro_id,
        totalQuantity: Number(totalQuantity),
        totalSalePrice: Number(totalSalePrice),
        productName,
      };
    });

    const overallSum = result.reduce(
      (accumulator, { totalQuantity, totalSalePrice }) => {
        accumulator.totalQuantity += totalQuantity;
        accumulator.totalSalePrice += totalSalePrice;
        return accumulator;
      },
      { totalQuantity: 0, totalSalePrice: 0 }
    );

    res.status(200).json({ overallSum, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ______________________select top sell pruduct of year____________________
exports.getSaleDetailSummaryByYear = async (req, res) => {
  try {
    const { year, limit } = req.query;

    const summary = await SaleDetail.findAll({
      attributes: [
        'Pro_id',
        [
          sequelize.fn('SUM', sequelize.col('Sale_qty')),
          'totalQuantity'
        ],
        [
          sequelize.fn('SUM', sequelize.col('Totalkip')),
          'totalSalePrice'
        ],
      ],
      group: ['Pro_id'],
      order: [
        [sequelize.literal('totalQuantity'), 'DESC']
      ],
      limit: parseInt(limit, 10),
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
          as: 'product',
        },
      ],
      where: sequelize.where(
        sequelize.fn('YEAR', sequelize.col('Sale_detail_date')),
        parseInt(year, 10)
      ),
    });

    if (summary.length === 0) {
      return res.status(404).json({ message: 'No sale details found for the given year' });
    }

    const result = summary.map((row) => {
      const { Pro_id, totalQuantity, totalSalePrice, product } = row.toJSON();

      const productName = product ? product.name : 'Product Not Found';

      return {
        product_id: Pro_id,
        totalQuantity: Number(totalQuantity),
        totalSalePrice: Number(totalSalePrice),
        productName,
      };
    });

    const overallSum = result.reduce(
      (accumulator, { totalQuantity, totalSalePrice }) => {
        accumulator.totalQuantity += totalQuantity;
        accumulator.totalSalePrice += totalSalePrice;
        return accumulator;
      },
      { totalQuantity: 0, totalSalePrice: 0 }
    );

    res.status(200).json({ overallSum, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create sale detail
exports.create = async (req, res) => {
  try {
    await SaleDetail.create({ ...req.body }).then((data) => {
      if (data) {
        return res.status(201).json(data);
      } else {
        return res.status(400).json({ message: "Something went wrong" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all sale details
exports.getAll = async (req, res) => {
  try {
    await SaleDetail.findAndCountAll().then((data) => {
      if (data.rows.length > 0) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get sale detail by id
exports.getById = async (req, res) => {
  console.log('here is get by id')
  try {
    const { id } = req.params;
    await SaleDetail.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "NOT FOUND DATA" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update sale detail
exports.updateSaleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await SaleDetail.update({ ...req.body }, { where: { id: id } }).then((updated) => {
      if (updated) {
        return res.status(200).json({ message: "Updated Success" });
      } else {
        return res.status(404).json({ message: "NOT FOUND DATA" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete sale detail
exports.deleteSaleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    await SaleDetail.destroy({ where: { id: id } }).then((deleted) => {
      if (deleted) {
        return res.status(200).json({ message: "Deleted Success" });
      } else {
        return res.status(404).json({ message: "NOT FOUND DATA" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Get sale details by Sale_id

exports.getSaleDetailsBySaleId = async (req, res) => {
  try {
    const { Sale_id } = req.params;
    await SaleDetail.findAll({
      where: { Sale_id },
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'name',
            'quatity',
            'sale_price',
            'barcode',
            'price',
            'supplier_id',
            'unit_id',
            'product_type_id',
          ],
          as: 'product',
        },
      ],
    }).then((saleDetails) => {
      if (saleDetails.length > 0) {
        const result = saleDetails.map((saleDetail) => {
          const {
            id,
            Sale_id,
            Sale_qty,
            Totalkip,
            product: {
              id: product_id,
              name: productName,
              quantity,
              sale_price,
              barcode,
              price,
              supplier_id,
              unit_id,
              product_type_id,
            },
          } = saleDetail.toJSON();

          return {
            id,
            Sale_id,
            Sale_qty,
            Totalkip,
            product_id,
            productName,
            quantity,
            sale_price,
            barcode,
            price,
            supplier_id,
            unit_id,
            product_type_id,
          };
        });

        return res.status(200).json(result);
      }

      return res
        .status(404)
        .json({ message: 'No sale details found for the given Sale_id' });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getSaleDetailSummaryAllTime = async (req, res) => {
  try {
    const { limit } = req.query;

    const summary = await SaleDetail.findAll({
      attributes: [
        'Pro_id',
        [
          sequelize.fn('SUM', sequelize.col('Sale_qty')),
          'totalQuantity'
        ],
        [
          sequelize.fn('SUM', sequelize.col('Totalkip')),
          'totalSalePrice'
        ],
      ],
      group: ['Pro_id'],
      order: [
        [sequelize.literal('totalQuantity'), 'DESC']
      ],
      limit: parseInt(limit, 10),
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
          as: 'product',
        },
      ],
    });

    if (summary.length === 0) {
      return res.status(404).json({ message: 'No sale details found for all time' });
    }

    const result = summary.map((row) => {
      const { Pro_id, totalQuantity, totalSalePrice, product } = row.toJSON();

      const productName = product ? product.name : 'Product Not Found';

      return {
        product_id: Pro_id,
        totalQuantity: Number(totalQuantity),
        totalSalePrice: Number(totalSalePrice),
        productName,
      };
    });

    const overallSum = result.reduce(
      (accumulator, { totalQuantity, totalSalePrice }) => {
        accumulator.totalQuantity += totalQuantity;
        accumulator.totalSalePrice += totalSalePrice;
        return accumulator;
      },
      { totalQuantity: 0, totalSalePrice: 0 }
    );

    res.status(200).json({ overallSum, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};