const routes = require("express").Router();
const employee = require("./employee.routes");
const customer = require("./customer.routes");
const supplier = require("./supplier.routes");
const ProductType = require('./productType.routes');
const Unit = require('./unit.routes');
const Product = require('./product.routes');
const Exchange = require('./exchange.routes');
//use routes
routes.use("/employee", employee);
routes.use("/customer", customer);
routes.use("/supplier", supplier);
routes.use("/productType", ProductType);
routes.use("/Unit", Unit);
routes.use("/Product", Product);
routes.use("/Exchange", Exchange);
module.exports = routes;