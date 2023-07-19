const controller = require('../controllers/sale_detail.controller');
const routes = require('express').Router();

routes.post('/', controller.create);
routes.put('/:id', controller.updateSaleDetail);
routes.get('/', controller.getAll);
routes.get('/:id', controller.getById);
routes.get('/sale-id/:Sale_id', controller.getSaleDetailsBySaleId); // New route for selecting by Sale_id
routes.delete('/:id', controller.deleteSaleDetail);
routes.get('/sale-details/summary', controller.getSaleDetailSummaryByYear);
routes.get('/summary/month', controller.getSaleDetailSummaryByMonthOfYear);


module.exports = routes;
