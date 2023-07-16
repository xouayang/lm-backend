const controller = require('../controllers/sale_detail.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.put('/:id', controller.updateSaleDetail);
routes.get('/', controller.getAll);
routes.get('/:id', controller.getById);
routes.delete('/:id', controller.deleteSaleDetail);

module.exports = routes;
