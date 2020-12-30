var PlantillaTributaria = require('../models/planillaTributaria');

function registrarPlanillaTributaria(req, res) {

    var data = req.body;
    var planillaTributaria = new PlantillaTributaria();

    //#region CALCULOS
    
    //#endregion
    //Datos personales
    planillaTributaria.año = data.año;
    planillaTributaria.periodo = data.periodo;
    planillaTributaria.codigo_dependiente = data.codigo_dependiente;
    planillaTributaria.nombres = data.nombres;
    planillaTributaria.primer_apellido = data.primer_apellido;
    planillaTributaria.segundo_apellido = data.segundo_apellido;
    planillaTributaria.ci = data.ci;
    planillaTributaria.tipo_documento = data.tipo_documento;
    planillaTributaria.novedades = data.novedades;
    
    planillaTributaria.monto_ingreso_neto = data.monto_ingreso_neto;
    planillaTributaria.salarios_minimos = data.salarios_minimos;
    planillaTributaria.importe_sujeto_impuesto = data.importe_sujeto_impuesto;
    planillaTributaria.impuesto_RCV_IVA = data.impuesto_RCV_IVA;
    planillaTributaria.trece_porciento= data.trece_porciento;
    planillaTributaria.impuesto_neto = data.impuesto_neto;
    planillaTributaria.casilla_693 = data.casilla_693;
    planillaTributaria.saldo_a_favor_fisco = data.saldo_a_favor_fisco;
    planillaTributaria.saldo_a_favor_dependiente = data.saldo_a_favor_dependiente;
    planillaTributaria.saldo_a_favor_dependiente_periodo_anterior = data.saldo_a_favor_dependiente_periodo_anterior; 
    planillaTributaria.mantenimiento_de_valor_del_saldo = data.mantenimiento_de_valor_del_saldo;
    planillaTributaria.saldo_periodo_anterior = data.saldo_periodo_anterior;
    planillaTributaria.saldo_utilizado = data.saldo_utilizado;
    planillaTributaria.saldo_rcv_iva = data.saldo_rcv_iva;
    planillaTributaria.pago_a_cuenta_periodo_anterior = data.pago_a_cuenta_periodo_anterior;
    planillaTributaria.f_110_casilla_465 = data.f_110_casilla_465;
    planillaTributaria.total_saldo_pago_a_cuenta = data.total_saldo_pago_a_cuenta;
    planillaTributaria.pago_a_cuenta_siete_rg_utilizado = data.pago_a_cuenta_siete_rg_utilizado;
    planillaTributaria.impuestos_rciva_retenido = data.impuestos_rciva_retenido;
    planillaTributaria.saldo_a_credito_fiscal = data.saldo_a_credito_fiscal;
    planillaTributaria.saldo_de_pago_a_cuenta_siete_rg_aFavorDependiente = data.saldo_de_pago_a_cuenta_siete_rg_aFavorDependiente;
    
    planillaTributaria.save((err, planilla_tributaria) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (planilla_tributaria) {
                res.status(200).send({ planilla_Tributaria: planilla_tributaria });
            } else {
                res.status(403).send({ message: 'No se registro el empleado' });
            }
        }
    });
}
function getPlanillaTributaria(req, res) {

    PlantillaTributaria.find({}).exec((err, planilla_Tributaria) => {
        if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
        if (!planilla_Tributaria) { return res.status(404).send({ message: 'No hay planillas' }); }
        return res.status(200).send({ planilla_Tributaria });
    })
}
//esta es Una prueba de q no estoy haciendo nad a
module.exports = {
    registrarPlanillaTributaria, getPlanillaTributaria }