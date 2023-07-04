const controller = require('../controllers/unit.contorller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.put('/:id', controller.updateUnit);
routes.get('/', controller.getAll);
routes.delete('/:id', controller.deleteUnit);
module.exports = routes
