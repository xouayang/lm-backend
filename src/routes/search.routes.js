const controller = require('../controllers/search/all_search');
const routes = require('express').Router();
routes.get('/search-customer', controller.search_customer);
routes.get('/search-employee', controller.search_employee);
routes.get('/search-product', controller.search_product);
module.exports = routes;
