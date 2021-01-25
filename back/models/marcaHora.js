// ESQUEMA DEL PERFIL
var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var MarcaHora = Schema({
    idEmpleado:String,
    idEmpresa:String,
    marcaH1:Date,
    marcaH2:Date,
    marcaH3:Date,
    marcaH4:Date,
    fechaRegistro: String
});
module.exports =  mongoose.model('marcahora',MarcaHora);