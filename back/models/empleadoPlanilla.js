
var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var EmpleadoPlanilla = Schema({
    idusuario: String,//{type: Schema.ObjectId, ref: 'usuario'},
    nombres:String,
    apellidoP:String,
    apellidoM:String,
    CI:String,
    exp:String,
    fecha_nacimiento:Date,
    sexo:String,
    ocupacion:String,
    fecha_ingreso  :Date,
    fecha_salida:Date,
    haber_basico:Number  
});
module.exports =  mongoose.model('empleadoPlanilla',EmpleadoPlanilla);
