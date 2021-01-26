
var mongoose = require('mongoose');
var Schema =    mongoose.Schema;
 
var PlanillaSueldo = Schema({
    idusuario: String,//{type: Schema.ObjectId, ref: 'usuario'},
    ocupacion:String,
    fecha_ingreso  :String,
    dias_pagados:Number,
    haber_basico: Number,
    total_dias_pagados:Number,
    bono_antiguedad:Number,
    horas_extras : Number,
    importe_horas_extras:Number,
    bono_produccion:Number,
    otros_bonos: Number,
    total_ganado:Number,
    monto_afp:Number,
    aporte_nal_solidario : Number,
    rc_iva:Number,
    anticipos:Number,
    otros_descuentos:Number,
    total_descuentos:Number,
    liquido_pagable:Number,
    minutos_retraso :Number ,
    idPlanillaMayor: { type: Schema.ObjectId, ref: 'planillaMayor'},
    idEmpleadoPlanilla: { type: Schema.ObjectId, ref: 'empleadoPlanilla'},
   
});

module.exports =  mongoose.model('planillaSueldo',PlanillaSueldo);
