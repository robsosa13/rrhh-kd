var express = require('express');
var planillaMayorController = require('../controllers/planillaMayorController');

var api = express.Router();
api.post('/planilla-mayor/nueva-planilla',planillaMayorController.registrarPlanillaMayor);
api.get('/planilla-mayor',planillaMayorController.getPlanilla_mayor);


module.exports = api;
