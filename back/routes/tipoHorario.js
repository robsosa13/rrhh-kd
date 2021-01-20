var express = require('express');
var TipoHorarioController = require('../controllers/tipoHorarioController');

var api = express.Router();
api.post('/tipo-horario/registrar',TipoHorarioController.registrarTipoHorario);
api.get('/tipo-horario',TipoHorarioController.listarTipoHorario);
api.get('/tipo-horario/:id',TipoHorarioController.get_HorarioById);

module.exports = api;