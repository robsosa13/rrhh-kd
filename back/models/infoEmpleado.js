var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var InfoEmpleadoSchema = Schema({

    titulo: String,
    // categoria: [{ type: Schema.ObjectId, ref: 'Categorias_Anuncio' }],
    tipo_contrato: Number,
    preten_salarial: Number,
    presentacion: String,
    pais: Number,
    ciudad_actual: Number,
    // files: [{ descripcion: String, file: String, tipo: Number }],
    estado: Number,
    // id_cv: { type: Schema.ObjectId, ref: 'Cv' },
    usuario: { type: Schema.ObjectId, ref: 'Usuario' },
    // garantias: [Number]
});
module.exports = mongoose.model('perfilEmpleadoSchema', InfoEmpleadoSchema);