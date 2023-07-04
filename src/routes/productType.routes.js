const controller = require('../controllers/product_type.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.put('/:id', controller.updateProductType);
routes.get('/', controller.getAll);
routes.delete('/:id', controller.deleteProductType);
module.exports = routes
