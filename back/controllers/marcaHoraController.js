var MarcaHora = require('../models/marcaHora');
function registrarMarcaHora(req,res){
    let data = req.body;
    var marcaHora = new MarcaHora();
    marcaHora.idEmpleado = data.idEmpleado;
    marcaHora.idEmpresa = data.idEmpresa;
    marcaHora.marcaH1 = data.marcaH1;
    marcaHora.marcaH2 = data.marcaH2;
    marcaHora.marcaH3 = data.marcaH3;
    marcaHora.marcaH4 = data.marcaH4;
    marcaHora.fecha=  new Date(data.fecha); 
    console.log(data.fecha)

    marcaHora.save((err,marcaHora_save)=>{
        if(marcaHora_save){
            res.status(200).send({marcaHora: marcaHora_save});
        }else{
            res.status(500).send(err);
        }
    });
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

    TipoHorario.findOneAndUpdate(id,{nombre: data.nombre}, (err,tipo_edit)=>{
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
            test()
        }
    })
}
function test (){

}

module.exports = {
    registrarMarcaHora,
}