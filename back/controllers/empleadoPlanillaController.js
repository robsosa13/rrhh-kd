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

    EmpleadoPlanilla.find({}).exec((err, empleadoP) => {
        if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
        if (!empleadoP) { return res.status(404).send({ message: 'No hay empleadoP' }); }
        return res.status(200).send({ empleadoP });
    })
}
function deleteEmpleado (req, res) {
    var EmpleadoId = req.params.id;
    EmpleadoPlanilla.findByIdAndRemove(EmpleadoId, (err, EmpleadoRemoved) => {
        if (err) return res.status(500).send({ message: 'No se pudo borrar la planilla' })
        if (!EmpleadoRemoved) return res.status(404).send({ message: 'NO se puede eliminar' })
        return res.status(200).send({
            empleadoP: EmpleadoRemoved
        })
    })
}
function editEmpleado(req,res){
    var id = req.params['id'];
    var data = req.body;

    EmpleadoPlanilla.findByIdAndUpdate({_id:id},{idusuario: data.idusuario, ocupacion : data.ocupacion,fecha_ingreso: data.fecha_ingreso, fecha_salida: data.fecha_salida},(err,empleadoEdit)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
           if(empleadoEdit){
            res.status(200).send({empleadoP: empleadoEdit});
           }else{
            res.status(403).send({message: 'La categoria no se pudo actualizar'});
           }
        }
    });
}


module.exports = { 
    registrarEmpleadoPlanilla,getEmpleadoPlanilla,deleteEmpleado,editEmpleado
}