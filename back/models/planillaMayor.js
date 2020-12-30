var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlanillaMayor = Schema({
    //idusuario
    //idSucursal: {type: Schema.ObjectId, ref: 'sucursal'},
    caja: String,
    razon_social: String,
    logo: String,
    titulo: String,
    nit: String,
    salario_minimo: String,
    periodo_planilla: String,
    año_planilla: String,
    afp: String,
    ciudad: String,
    sucursal: String,
    direccion: String,
    ufv_inicial: String,
    telefono: String,
    ufv_final: String
});

module.exports = mongoose.model('planillaMayor', PlanillaMayor);
