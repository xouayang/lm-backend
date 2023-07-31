const imports = require("../model/import.model");
const importDetails = require("../model/importDetails.model");
const product = require("../model/prduct.model");
const sequelize = require("../configs/db");
const order = require("../model/order.model");
const { QueryTypes } = require("sequelize");

exports.create_import = async (req, res) => {
  try {
    let result = [];
    let order_update_id;
    const employee_id = req.payload.id;
    const { order_id, import_date, import_quaty, import_total_kip } = req.body;
    const item = req.body.item;
    for (let i = 0; i < item.length; i++) {
      await product.increment("quatity", {
        by: item[i].import_qty,
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
          order_update_id = data.order_id;
          await importDetails
            .create({
              import_id: data.id,
              import_details_date: item[i].import_details_date,
              pro_id: item[i].pro_id,
              import_qty: item[i].import_qty,
              total_price: item[i].total_price,
            })
            .then((data) => {
              result.push(data);
            })
            .catch((error) => {
              console.log({ message: error.message });
            });
        });
    }
    await order.update({ status: 0 }, { where: { id: order_update_id } });
    return res.status(200).json(result);
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
       ip.import_date,ipd.import_qty as details_qty,ipd.total_price,
       pd.name as product_name,pd.quatity,pd.sale_price,un.name as unit_name,
       sp.name as supplier_name,pdt.name as product_type_name,
       em.first_name as employee_name,pd.barcode
        from imports ip 
       inner join import_details ipd on ip.id = ipd.import_id
       inner join products pd on ipd.pro_id = pd.id
       inner join units un on pd.unit_id = un.id
       inner join suppliers sp on pd.supplier_id = sp.id
       inner join product_types pdt on pd.product_type_id = pdt.id
       inner join employees em on ip.employee_id = em.id
       `;
    const data = await sequelize
      .query(sql, { type: QueryTypes.SELECT })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ___________________REPORT BY START DATE AND END DATE
// Get imports data by start date and end date
exports.get_imports_by_date_range = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;

    // Check if startDate and endDate are not provided, set them to today's date (in UTC)
    if (!startDate || !endDate) {
      const today = new Date();
      startDate = today.toISOString().slice(0, 10);
      endDate = today.toISOString().slice(0, 10);
    }

    const sql = `
      SELECT DISTINCT ip.id, ip.import_quaty AS total_quaty,
      ip.import_total_kip,
      ip.import_date, ipd.import_qty AS details_qty, ipd.total_price,
      e.first_name AS employee_first_name, e.last_name AS employee_last_name
      FROM imports ip 
      INNER JOIN import_details ipd ON ip.id = ipd.import_id
      INNER JOIN employees e ON ip.employee_id = e.id
      WHERE DATE(ip.import_date) BETWEEN :startDate AND :endDate
    `;

    const data = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
      replacements: { startDate, endDate },
    });

    if (data.length > 0) {
      return res.status(200).json(data);
    } else {
      return res
        .status(200)
        .json("No data found for the specified date range.");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
