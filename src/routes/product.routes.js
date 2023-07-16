const controller = require('../controllers/product.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.put('/:id', controller.updateProduct);
routes.get('/', controller.get_all);
routes.delete('/:id', controller.deleteProduct);
routes.put('/subtract-quantity/:id', controller.subtractQuantity); // Add this line to include the subtractQuantity route

module.exports = routes;
