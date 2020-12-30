var TipoHorario = require('../models/tipoHorario');
function registrarTipoHorario(req,res){
    let data = req.body;
    var tipoHorario = new TipoHorario();
    tipoHorario.nombre = data.nombre;
    tipoHorario.horario1 = data.horario1;
    tipoHorario.horario2 = data.horario2;
    tipoHorario.horario3 = data.horario3;
    tipoHorario.horario4 = data.horario4;
   
    tipoHorario.save((err,tipoH_save)=>{
        if(tipoH_save){
            res.status(200).send({tipoHorario: tipoH_save});
        }else{
            res.status(500).send(err);
        }
    });
}
function listarTipoHorario(req,res){
    TipoHorario.find((err,tipoHorario)=>{
        if(clientes_data){
            res.status(200).send({tipoHorario: tipoHorario});
        }else{
            res.status(403).send({message: 'No hay registros en la bd'});
        }
    })
}
function get_HorarioById(req,res){
    var id = req.params['id'];

    TipoHorario.findById(id,(err,res_horario)=>{
        if(res_horario){
            res.status(200).send({TipoHorario:res_horario});
        }
    })
}

function editarTipoHorario(req,res){
    let id = req.params['id'];
    let data = req.body;

    TipoHorario.findOneAndUpdate(id,{nombre: data.nombre,
                                    horario1: data.horario1,
                                    horario2: data.horario2,
                                    horario3: data.horario3,
                                    horario4: data.horario4}, 
                                    (err,tipo_edit)=>{
        if(tipo_edit){
            res.status(200).send({tipoHorario: tipo_edit});
        }else{
            res.status(500).send(err);
        }
    })
}

function eliminarTipoHorario(req,res){
    let id = req.params['id'];

    TipoHorario.findByIdAndRemove(id,(err,tipo_deleted)=>{
        if(tipo_deleted){
            res.status(200).send({tipoHorario:tipo_deleted});
        }else{
            res.status(500).send(err);
        }
    })
}
module.exports = {
    registrarTipoHorario,
    listarTipoHorario,
    editarTipoHorario,
    get_HorarioById,
    editarTipoHorario,
    eliminarTipoHorario }