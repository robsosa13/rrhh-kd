var express = require('express');
var planillaMayorController = require('../controllers/planillaMayorController');

var api = express.Router();
api.post('/planilla-mayor/nueva-planilla',planillaMayorController.registrarPlanillaMayor);
api.get('/planilla-mayor',planillaMayorController.getPlanilla_mayor);

// app.get('/api/planilla-mayor', (req, res) => {
//     res.json(planillas);
//   });
module.exports = api;
