var express = require('express');
var empresaHorarioController = require('../controllers/empresaHorarioController');

var api = express.Router();
api.post('/empresa-calendario/registrar',empresaHorarioController.registrarEmpresaHorarioCalendario);
api.get('/empresa-calendario/:id',empresaHorarioController.get_Empresa_horario_calendario);

module.exports = api;