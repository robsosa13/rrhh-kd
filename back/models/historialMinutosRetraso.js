var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var HistorialMinutosRetraso = Schema({
    idEmpleado:String,
    minutosRetraso :Number,
    horasRetraso:Number,
    mes:String,
});
module.exports =  mongoose.model('historialMinutosRetraso',HistorialMinutosRetraso);