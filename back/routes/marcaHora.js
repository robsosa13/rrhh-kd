var express = require('express');
var marcaHoraController = require('../controllers/marcaHoraController');

var api = express.Router();
api.post('/marca-hora/registrar',marcaHoraController.registrarMarcaHora);

module.exports = api;