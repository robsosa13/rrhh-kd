// const { response } = require('express');
// const fetch = require("node-fetch");
const moment = require('moment')
var PlanillaSueldos = require('../models/planillaSueldos');
var HistorialMinutosRetraso = require('../models/historialMinutosRetraso');
var Empleado_planilla = require('../models/empleadoPlanilla')
function registrarPlanilla(req, res) {
    // var historialMinutosRetraso = new HistorialMinutosRetraso();
    console.log('1 !')
    var planilla = new PlanillaSueldos();
    var params = req.body;
    var result
    var fecha = new Date(), mes = fecha.getMonth() + 1, año = fecha.getFullYear();
    var bono_antiguedad;
    var anios_antiguedad
    var minutos_retraso, horas_retraso, total_minutos;
    HistorialMinutosRetraso.find({ idEmpleadoPlanilla: params.idEmpleadoPlanilla, mes: mes, año: año }).exec((err, resultado) => {
        if (resultado) {
            console.log('MINUTOS DE RETRASO', resultado)
            console.log('entra !')
            for (const item in resultado) {
                console.log('entra !')
                minutos_retraso = parseInt(resultado[item].minutosRetraso)
                horas_retraso = parseInt(resultado[item].horasRetraso) * -1;
                total_minutos = parseInt(horas_retraso * 60) + parseInt(minutos_retraso);
                var id_empleadoP = params.idEmpleadoPlanilla

                //moment("20111031", "YYYYMMDD").fromNow();
                // var fecha2 = moment('2015-08-01');
                // console.log(fecha2.diff(fecha1, 'years'), ' años de diferencia');
                // anios_antiguedad=fecha2.diff(fecha1, 'years')
                var test = moment("20111031", "YYYYMMDD").fromNow();
                console.log('TST', parseInt(test));
                // var anios_antiguedad = 
                Empleado_planilla.find({id:id_empleadoP}).exec((err,data_empleadoP) =>{
                    if(data_empleadoP){
                        for (const item in data_empleadoP) {

                            var fecha1 = moment('2016-07-12');
                            var fecha2 = moment('2016-08-01');
                            console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
                            anios_antiguedad=fecha.getFullYear()  

                        }
                    }
                })
                var AFP = 0, descuentosPOrRetraso = 0, descuento_retraso = 0, PagoDiasTrabajados = 0, TOTALganado = 0, IMPORTEHorasExtras = 0;
                //Total dias pagados
                //#region CALCULOS
                if (params.horas_extras == 0 || params.horas_extras == null) {
                    IMPORTEHorasExtras = 0;
                } else {
                    IMPORTEHorasExtras = ((((params.haber_basico / 30) / 8) * 2) * params.horas_extras);
                }
                PagoDiasTrabajados = ((params.haber_basico / 30) * params.dias_pagados);
                TOTALganado = parseInt(params.haber_basico) + parseInt(params.otros_bonos) + parseInt(params.bono_produccion) +
                    parseInt(IMPORTEHorasExtras) + parseInt(params.bono_antiguedad);
                console.log('TOTAL GANADO', TOTALganado)
                descuento_retraso = (((TOTALganado / 30) / 8) / 60);
                console.log('descuento_retraso GANADO', descuento_retraso)
                console.log('minutos GANADO', total_minutos)
                descuentosPOrRetraso = descuento_retraso * total_minutos;
                console.log('descuento por retraso', parseInt(descuentosPOrRetraso))
                // console.log('descuento por retraso',descuentosPOrRetraso)
                AFP = (TOTALganado * 12.71) / 100;
                TOTALdescuentos = AFP + parseInt(params.aporte_nal_solidario) + parseInt(params.anticipos) + parseInt(params.otros_descuentos) + parseInt(descuentosPOrRetraso);
                //#endregion
                planilla.idPlanillaMayor = params.idPlanillaMayor;
                planilla.idEmpleadoPlanilla = params.idEmpleadoPlanilla;
                planilla.idusuario = 'asd';//params.idusuario;
                planilla.ocupacion = params.ocupacion;
                planilla.fecha_ingreso = params.fecha_ingreso;
                planilla.dias_pagados = params.dias_pagados;
                planilla.haber_basico = params.haber_basico;
                planilla.total_dias_pagados = PagoDiasTrabajados;
                planilla.bono_antiguedad = params.bono_antiguedad;
                planilla.horas_extras = params.horas_extras;
                planilla.importe_horas_extras = IMPORTEHorasExtras;
                planilla.bono_produccion = params.bono_produccion;
                planilla.otros_bonos = params.otros_bonos;
                planilla.total_ganado = TOTALganado;
                planilla.monto_afp = AFP;
                planilla.aporte_nal_solidario = params.aporte_nal_solidario;
                planilla.rc_iva = params.rc_iva;
                planilla.anticipos = params.anticipos;
                planilla.otros_descuentos = params.otros_descuentos;
                planilla.total_descuentos = TOTALdescuentos;
                planilla.liquido_pagable = TOTALganado - TOTALdescuentos;
                planilla.minutos_retraso = total_minutos;
                planilla.save((err, planilla_result) => {
                    if (err) { return res.status(500).send({ message: "Error al guardar los datos" }) }
                    if (!planilla_result) { return res.status(404).send({ message: "No se guardo correctamente la planilla" }) }
                    return res.status(200).send({ planilla: planilla_result })
                })
            }
        } else {
            console.log('error')
        }

    })


}
function getPlanilla(req, res) {
    PlanillaSueldos.find({}).populate('idPlanillaMayor').populate('idEmpleadoPlanilla').exec((err, planillas) => {
        if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
        if (!planillas) { return res.status(404).send({ message: 'No hay planillas' }); }
        return res.status(200).send({ planillas });
    })

}


function getPlanillaId(req, res) {
    var idPlanillaMayor = req.params['id'];
    PlanillaSueldos.find({ idPlanillaMayor: idPlanillaMayor }).populate('idPlanillaMayor').populate('idEmpleadoPlanilla').exec((err, planillas) => {
        if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
        if (!planillas) { return res.status(404).send({ message: 'No hay planillas' }); }
        return res.status(200).send({ planillas });
    })

}
function getPlanillaCI(req, res) {
    PlanillaSueldos.find({ CI: new RegExp(CI, 'i') }).exec((err, planilla_result) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (planilla_result) {
                res.status(200).send({ planilla: planilla_result });
            } else {
                res.status(404).send({ message: 'No hay ningun registro' });
            }
        }
    });

}
function detailPlanilla(req, res) {
    var id = req.params.id;
    PlanillaSueldos.find({ _id: id }).exec((err, planilla) => {
        if (err) {
            return res.status(500).send({ message: "Error al consultar" });

        } else
            if (!planilla) {
                return res.status(404).send({ message: "Planilla no encontrada" });

            } else {
                return res.status(200).send({ planilla });
            }
    });
}
function deletePlanilla(req, res) {
    var planillaId = req.params.id;
    PlanillaSueldos.findByIdAndRemove(planillaId, (err, planillaRemoved) => {
        if (err) return res.status(500).send({ message: 'No se pudo borrar la planilla' })
        if (!planillaRemoved) return res.status(404).send({ message: 'NO se puede eliminar' })
        return res.status(200).send({
            planilla: planillaRemoved
        })
    })
}


module.exports = {
    registrarPlanilla, getPlanillaId, getPlanilla
}