const imports = require("../model/import.model");
const importDetails = require("../model/importDetails.model");
const product = require('../model/prduct.model')
exports.create_import = async (req, res) => {
  try {
    const {
      order_id,
      employee_id,
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
          await importDetails.create({
            order_id: data.id,
            import_details_date: item[i].import_details_date,
            pro_id: item[i].pro_id,
            import_qty: item[i].import_qty,
            total_price: item[i].total_price,
          });
        });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// get history of imports
