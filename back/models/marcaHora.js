// ESQUEMA DEL PERFIL
var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var MarcaHora = Schema({
    idEmpleado:String,
    idEmpresa:String,
    marcaH1:String,
    marcaH2:String,
    marcaH3:String,
    marcaH4:String,
    fecha:Date
});
module.exports =  mongoose.model('marcahora',MarcaHora);