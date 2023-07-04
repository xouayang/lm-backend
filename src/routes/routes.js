const routes = require("express").Router();
const employee = require("./employee.routes");
const customer = require("./customer.routes");
const supplier = require("./supplier.routes");
const ProductType = require('./productType.routes')
const Unit = require('./unit.routes')
//use routes
routes.use("/employee", employee);
routes.use("/customer", customer);
routes.use("/supplier", supplier);
routes.use("/productType", ProductType);
routes.use("/Unit", Unit);
module.exports = routes;