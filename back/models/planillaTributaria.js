var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PlanillaTributaria = Schema({
    año: Number,
    periodo: String,
    codigo_dependiente: String,
    nombres: String,
    primer_apellido: String,
    segundo_apellido: String,
    ci: String,
    tipo_documento: String,
    novedades: String,    
    monto_ingreso_neto: Number,
    salarios_minimos: Number,
    importe_sujeto_impuesto: Number,
    impuesto_RCV_IVA: Number,
    trece_porciento: Number,
    impuesto_neto: Number,
    casilla_693: Number,
    saldo_a_favor_fisco: Number,
    saldo_a_favor_dependiente: Number,
    saldo_a_favor_dependiente_periodo_anterior: Number,
    mantenimiento_de_valor_del_saldo: Number,
    saldo_periodo_anterior:Number,
    saldo_utilizado:Number, 
    saldo_rcv_iva:Number,
    pago_a_cuenta_periodo_anterior:Number,
    f_110_casilla_465:Number,
    total_saldo_pago_a_cuenta:Number,
    pago_a_cuenta_siete_rg_utilizado:Number,
    impuestos_rciva_retenido:Number,
    saldo_a_credito_fiscal:Number,
    saldo_de_pago_a_cuenta_siete_rg_aFavorDependiente:Number
});

module.exports = mongoose.model('planillatributaria', PlanillaTributaria);
