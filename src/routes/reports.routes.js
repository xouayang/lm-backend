const controller = require('../controllers/reports/all_reports');
const routes = require('express').Router();
routes.get('/customer', controller.get_customer);
routes.get('/employee', controller.get_employee);
routes.get('/product', controller.get_all_product);
routes.get('/product-finished', controller.product_finished);
routes.get('/top-sale', controller.top_sale_product);
module.exports = routes;
