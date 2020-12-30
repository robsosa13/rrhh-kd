
var express = require('express');
var EmpleadoPlanilla = require('../controllers/empleadoPlanillaController');

var router = express.Router();

//Routes
router.post('/empleado-planilla/registrar',EmpleadoPlanilla.registrarEmpleadoPlanilla);
router.get('/empleado-planilla',EmpleadoPlanilla.getEmpleadoPlanilla);
module.exports = router;