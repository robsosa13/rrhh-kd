var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var TipoHorario = Schema({
    nombre: String,
    horario1:String,
    horario2:String,
    horario3:String,
    horario4:String
});
module.exports =  mongoose.model('tipoHorario',TipoHorario);