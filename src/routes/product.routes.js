const controller = require('../controllers/product.controller');
const routes = require('express').Router();


routes.post('/', controller.create);
routes.put('/:id', controller.updateProduct);
routes.get('/', controller.get_all);
routes.delete('/:id', controller.deleteProduct);
routes.put('/subtract-quantity/:id', controller.subtractQuantity); // Add this line to include the subtractQuantity route
routes.get('/almost-out-of-stock', controller.get_almost_out_of_stock_products);
module.exports = routes;
