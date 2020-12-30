var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RetrasoEmpleado = Schema({
    idEmpleado:String,
    minutos:Number,
    fecha:Date
});
module.exports = mongoose.model('retrasoempleado', RetrasoEmpleado);

