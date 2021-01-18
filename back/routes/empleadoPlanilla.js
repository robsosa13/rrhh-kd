
var express = require('express');
var EmpleadoPlanilla = require('../controllers/empleadoPlanillaController');
const empleadoPlanilla = require('../models/empleadoPlanilla');

var router = express.Router();

//Routes
router.post('/empleado-planilla/registrar',EmpleadoPlanilla.registrarEmpleadoPlanilla);
router.get('/empleado-planilla',EmpleadoPlanilla.getEmpleadoPlanilla);
router.delete('/empleado-planilla/:id',EmpleadoPlanilla.deleteEmpleado);
module.exports = router;