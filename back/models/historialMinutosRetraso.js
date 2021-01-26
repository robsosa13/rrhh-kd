var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var HistorialMinutosRetraso = Schema({
    idEmpleadoPlanilla: { type: Schema.ObjectId, ref: 'empleadoPlanilla'},
    minutosRetraso :Number,
    horasRetraso:Number,
    mes:String,
    año:String,

});
module.exports =  mongoose.model('historialMinutosRetraso',HistorialMinutosRetraso);