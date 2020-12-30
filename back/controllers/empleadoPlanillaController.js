var EmpleadoPlanilla = require('../models/empleadoPlanilla');

function registrarEmpleadoPlanilla(req, res) {

    var data = req.body;
        var empleadoP = new EmpleadoPlanilla();
        empleadoP.idusuario = data.idusuario;
        empleadoP.ocupacion = data.ocupacion;
        empleadoP.fecha_ingreso = data.fecha_ingreso;
        empleadoP.fecha_salida = data.fecha_salida;
        empleadoP.save((err, empleado_result) => { 
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            } else {
                if (empleado_result) {
                    res.status(200).send({ empleadoP: empleado_result });
                } else {
                    res.status(403).send({ message: 'No se registro el empleado' });
                }
            }
        });
}
function getEmpleadoPlanilla(req, res) {

    EmpleadoPlanilla.find({}).exec((err, planillas) => {
        if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
        if (!planillas) { return res.status(404).send({ message: 'No hay planillas' }); }
        return res.status(200).send({ planillas });
    })
}

module.exports = {
    registrarEmpleadoPlanilla,getEmpleadoPlanilla
}