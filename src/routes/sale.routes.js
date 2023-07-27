const controller = require('../controllers/sale.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.get("/date/range", controller.getSalesByDateRange);
routes.put('/:id', controller.updateSale);
routes.get('/', controller.getAll);
routes.get('/:id', controller.getById);
routes.delete('/:id', controller.deleteSale);
routes.get('/details/:id', controller.getSaleById); // New route for fetching sale details by ID

module.exports = routes;
