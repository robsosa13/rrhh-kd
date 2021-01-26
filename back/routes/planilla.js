var express = require('express');
var planillaController = require('../controllers/planillaController');

var api = express.Router();
api.post('/planilla/registrar',planillaController.registrarPlanilla);
api.get('/planillas',planillaController.getPlanilla);
api.get('/planilla/:id',planillaController.getPlanillaId);

module.exports = api;
