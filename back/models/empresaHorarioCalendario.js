// ESQUEMA DEL PERFIL
var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
var EmpresaHorarioCalendario = Schema({
    idTipoHorario: { type: Schema.ObjectId, ref: 'tipoHorario' },
    idEmpresaHorario: { type: Schema.ObjectId, ref: 'empresaHorario' },
    dia:String
});
module.exports =  mongoose.model('empresaHorarioCalendario',EmpresaHorarioCalendario);