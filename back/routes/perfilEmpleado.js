
var express = require('express');
var PerfilEmpleadoController = require('../controllers/perfilEmpleadoController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'});
var router = express.Router();

//Routes
router.post('/empleado/registrar',PerfilEmpleadoController.InsertPerfilEmpleado);


module.exports = router;