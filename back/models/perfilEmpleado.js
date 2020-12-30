// ESQUEMA DEL PERFIL
var mongoose = require('mongoose');
var Schema =    mongoose.Schema; 
var PerfilEmpleadoSchema = Schema({

    nombres: String,
    apellidos: String,
    tel_celular: String,
    tel_fijo: String,
    nacionalidad: String,
    tipo_documento: Number,
    num_documento: String,
    fec_nacimiento: String,
    sexo: Number,
    direccion: String,
    estado_civil: Number,
    // foto: [String],
    estado: Number,
    // idempleado: { type: Schema.ObjectId, ref: 'Empleado' },
    usuario: { type: Schema.ObjectId, ref: 'usuario' },
    // licencias: [Number]
});

module.exports =  mongoose.model('perfilEmpleadoSchema',PerfilEmpleadoSchema);