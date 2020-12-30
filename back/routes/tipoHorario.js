var express = require('express');
var TipoHorarioController = require('../controllers/tipoHorarioController');

var api = express.Router();
api.post('/tipo-horario/registrar',TipoHorarioController.registrarTipoHorario);

module.exports = api;