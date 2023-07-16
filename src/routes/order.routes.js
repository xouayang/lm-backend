const controller = require('../controllers/order.controller');
const routes = require('express').Router();
const {verifyToken} = require('../middleware')
routes.post('/',verifyToken, controller.create);
routes.get('/:id', controller.get_all_order);
// routes.put('/:id', controller.updateSale);
// routes.get('/', controller.getAll);
// routes.get('/:id', controller.getById);
// routes.delete('/:id', controller.deleteSale);

module.exports = routes;
