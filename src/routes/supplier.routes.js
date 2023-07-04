const controller = require('../controllers/supplier.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.put('/:id', controller.updateEmployee);
routes.get('/', controller.getAll);
// routes.get('/:id', controller.getById);
routes.delete('/:id', controller.deleteEmployee);
module.exports = routes
