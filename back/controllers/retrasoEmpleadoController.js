var RetrasoEmpleado = require('../models/retrasoEmpleado');

function registrarTipoHorario(req,res){
    let data = req.body;
    var retrasoEmpleado = new RetrasoEmpleado();
    retrasoEmpleado.idEmpleado = data.idEmpleado;
    retrasoEmpleado.minutos = data.minutos;
    retrasoEmpleado.fecha = data.fecha;
    retrasoEmpleado.save((err,retraso_empleado_save)=>{
        if(retraso_empleado_save){
            res.status(200).send({retrasoEmpleado: retraso_empleado_save});
        }else{
            res.status(500).send(err);
        }
    });
}
module.exports = {
    registrarTipoHorario,

}