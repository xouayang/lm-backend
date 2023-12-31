const controller = require('../controllers/customer.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.get('/', controller.getAll);
routes.get('/:id', controller.getById);
routes.put('/:id', controller.updateCustomer);
routes.delete('/:id', controller.deleteCustomer);

module.exports = routes;
