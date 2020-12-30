// ESQUEMA USUARIO
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UsuarioSchema = Schema({
        email: String,
        password: String,
        numeroCel: Number,
        estado: Number,
        id_tipoUsuario: String,
        nombre_tipo: String
    });

module.exports =  mongoose.model('usuario',UsuarioSchema);
