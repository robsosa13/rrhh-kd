var EmpresaHorario = require('../models/empresaHorario');
var TipoHorario = require('../models/tipoHorario');
var EmpresaHorarioCalendario = require('../models/empresaHorarioCalendario');
function registrarEmpresaHorarioCalendario(req,res){
    let data = req.body;
    var empresaHorario = new EmpresaHorario();
    empresaHorario.mes = data.mes;
    empresaHorario.anio = data.anio;
    empresaHorario.idEmpresa = data.idEmpresa;
    empresaHorario.idSucursal = data.idSucursal;
    empresaHorario.save((err,empresaHorario_save)=>{
        if(empresaHorario_save){

            let empresaCalendario = data.detalles;

            empresaCalendario.forEach((element,index) => {
                var empresaHorarioCalendario = new EmpresaHorarioCalendario();
                empresaHorarioCalendario.idTipoHorario =  element.idTipoHorario ;
                empresaHorarioCalendario.dia=element.dia;
                empresaHorarioCalendario.idEmpresaHorario =  empresaHorario_save._id ;
                empresaHorarioCalendario.save((err,empresaHorarioCalendario_save)=>{
                    if(empresaHorarioCalendario_save){
                        console.log(empresaHorario_save)
                        console.log(empresaHorarioCalendario_save)
                        res.end();
                    }else{
                        res.send(err);
                    }
                })
            });
        }else{
            res.send(err);
        }
    });
}
function get_Empresa_horario_calendario(req,res){
    var id = req.params['id'];
    EmpresaHorario.findById(id).exec((err,empresa_horario)=>{
        if(empresa_horario){
            EmpresaHorarioCalendario.find({idEmpresaHorario:empresa_horario._id}).populate('idTipoHorario').exec({idEmpresaHorario:id},(err,result_calendario)=>{
                if(result_calendario){
                    // console.log(empresa_horario)
                    // console.log(result_calendario)
                    res.status(200).send(
                        {
                            data : {
                                empresaHorario: empresa_horario,
                                detalles: result_calendario
                            }
                        }
                    );

                }
                else{  res.send(err);
                }
            });
        } else{  res.send(err);}
    });
}
function get_byMonth(req,res){
    let data = req.body; 
       
    EmpresaHorario.find({
        anio:data.anio,
        mes:data.mes
    }).exec((err,empresa_horario)=>{
        if(empresa_horario){
            EmpresaHorarioCalendario.find({
                idEmpresaHorario:empresa_horario._id}
                ).populate('idTipoHorario').exec(
                    {idEmpresaHorario:id},(err,result_calendario)=>{
                if(result_calendario){
                    console.log(empresa_horario)
                    console.log(result_calendario)
                    res.status(200).send(
                        {
                            data : {
                                empresaHorario: empresa_horario,
                                detalles: result_calendario
                            }
                        }
                    );
                }
                else{  res.send(err);
                }
            });
        } else{  res.send(err);}
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
        }
    })
}
module.exports = {  
    registrarEmpresaHorarioCalendario,
    get_Empresa_horario_calendario,eliminarTipoHorario,editarTipoHorario,listarTipoHorario,get_HorarioById}  
