// ESQUEMA DEL PERFIL
var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var EmpresaHorario = Schema({

    mes:String,
    anio:String,
    idEmpresa:String,
    idSucursal:String
});

module.exports =  mongoose.model('empresaHorario',EmpresaHorario);