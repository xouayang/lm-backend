const controller = require('../controllers/sale.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.put('/:id', controller.updateSale);
routes.get('/', controller.getAll);
routes.get('/:id', controller.getById);
routes.delete('/:id', controller.deleteSale);

module.exports = routes;
