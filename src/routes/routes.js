const routes = require("express").Router();
const employee = require("./employee.routes");
const customer = require("./customer.routes");
const supplier = require("./supplier.routes");
const ProductType = require('./productType.routes')
const Product = require('./product.routes')
const Sale = require('./sale.routes')
const Sale_detail = require('./sale_detail.routes')
const Unit = require('./unit.routes');
const Exchange = require('./exchange.routes');
const order = require('./order.routes');
const imports = require('./import.routes');
const reports = require('./reports.routes');
const search = require('./search.routes');
const upload = require('../uploads/upload.product');

//use routes
routes.use("/employee", employee);
routes.use("/customer", customer);
routes.use("/supplier", supplier);
routes.use("/productType", ProductType);
routes.use("/Unit", Unit);
routes.use("/Product", Product);
routes.use("/sale", Sale);
routes.use("/sale_detail", Sale_detail);
routes.use("/Exchange", Exchange);
routes.use("/order", order);
routes.use("/imports", imports);
routes.use("/reports", reports);
routes.use("/search", search);
routes.use('/upload', upload);
module.exports = routes;