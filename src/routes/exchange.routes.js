const controller = require('../controllers/exchange.controller');
const routes = require('express').Router();

routes.post('/',controller.create);
routes.put('/:id', controller.update_data);
routes.get('/', controller.get_all);
routes.delete('/:id', controller.deleted_data);
module.exports = routes
