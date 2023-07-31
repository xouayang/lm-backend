const controller = require('../controllers/import.controller');
const routes = require('express').Router();
const {verifyToken} = require('../middleware')
routes.post('/',verifyToken, controller.create_import);
routes.get('/', controller.get_history);
// routes.put('/:id', controller.updateSale);
routes.get('/date-range', controller.get_imports_by_date_range);
// routes.get('/:id', controller.getById);
// routes.delete('/:id', controller.deleteSale);

module.exports = routes;
