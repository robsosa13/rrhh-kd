
var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var EmpleadoPlanilla = Schema({
    idusuario: String,//{type: Schema.ObjectId, ref: 'usuario'},
    ocupacion:String,
    fecha_ingreso  :String,
    fecha_salida:String,
    haber_basico:Number  
});
module.exports =  mongoose.model('empleadoPlanilla',EmpleadoPlanilla);
