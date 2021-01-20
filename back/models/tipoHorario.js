var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var TipoHorario = Schema({
    nombre: String,
    horario1H:String, 
    horario1M:String,
    horario2H:String,
    horario2M:String,
    horario3H:String,
    horario3M:String,
    horario4H:String,
    horario4M:String
});
module.exports =  mongoose.model('tipoHorario',TipoHorario);