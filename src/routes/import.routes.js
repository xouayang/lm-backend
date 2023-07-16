const controller = require('../controllers/import.controller');
const routes = require('express').Router();
const {verifyToken} = require('../middleware')
routes.post('/',verifyToken, controller.create_import);
// routes.get('/:id', controller.get_all_order);
// routes.put('/:id', controller.updateSale);
// routes.get('/', controller.getAll);
// routes.get('/:id', controller.getById);
// routes.delete('/:id', controller.deleteSale);

module.exports = routes;
