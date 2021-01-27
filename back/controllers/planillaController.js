// const { response } = require('express');
// const fetch = require("node-fetch");
/**
 * var numero = 9.46789; 
var conDecimal = numero.toFixed(2); 
// Igual a 9.47 
 */
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
    var aporte_nacional_solidario
    var haber_basico
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
                    // var anios_antiguedad = 
                    Empleado_planilla.find({ _id: id_empleadoP }).exec((err, data_empleadoP) => {
                        console.log('data ',data_empleadoP)
                        if (data_empleadoP) {
                            for (const item in data_empleadoP) {
                                var fecha1 //= moment('2016-07-12');
                                var fecha2 = new Date() //= moment('2016-08-01');
                               // fecha2=data_empleadoP[item].fecha_salida
                                fecha1=data_empleadoP[item].fecha_ingreso
                                var anio, mes, dia;
                                anio = data_empleadoP[item].fecha_ingreso.getFullYear();
                                mes = data_empleadoP[item].fecha_ingreso.getMonth() + 1;
                                dia = data_empleadoP[item].fecha_ingreso.getDate();

                                
                                var diff =(fecha.getTime() - fecha1.getTime()) / 1000;
                                  diff /= (60 * 60 * 24);
                                var result = Math.abs(Math.round(diff/365.25));

                                console.log('DIF !!!',result)

                                var RESULT_ANTIGUEDAD = moment(""+anio+"0"+mes+""+dia, "YYYYMMDD").fromNow();
                                // var regex = /(\d+)/g;

                                // var name="i_txt_7_14";
                                // console.log('STRING',RESULT_ANTIGUEDAD.match(regex)); 
                                anios_antiguedad =result-1
                                //console.log('TST', parseInt(anios_antiguedad));
                                haber_basico = data_empleadoP[item].haber_basico
                                // console.log(fecha2.diff(fecha1, 'years'), ' años de diferencia');
                                // anios_antiguedad= parseInt( fecha2.diff(fecha1, 'years'))
                                //console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
                                // anios_antiguedad = fecha.getFullYear()
                                console.log('AÑOS ',anios_antiguedad)
                                /* 
                                    - disenio pdf boleta de pago y planilla
                                    - editar
                                    - planilla tributaria
                                    - listar por sucursal 
                                    - listar por empleado 
                                 */
                                var AFP = 0, descuentosPOrRetraso = 0, descuento_retraso = 0, PagoDiasTrabajados = 0, TOTALganado = 0, IMPORTEHorasExtras = 0;
                                //Total dias pagados
                                //#region CALCULOS
                                if (params.horas_extras == 0 || params.horas_extras == null) {
                                    IMPORTEHorasExtras = 0;
                                } else {
                                    IMPORTEHorasExtras = ((((haber_basico / 30) / 8) * 2) * params.horas_extras);
                                }
                                console.log('DONDE ENTRA !!! ',anios_antiguedad)
                                if (anios_antiguedad < 2) {
                                    bono_antiguedad = 0;
                                }
                                if (anios_antiguedad >= 2 && anios_antiguedad <= 4) {
                                    console.log('aqui')
                                    bono_antiguedad = 318.3;
                                } else {
                                    if (anios_antiguedad >= 5 && anios_antiguedad <= 7) {
                                        bono_antiguedad = 700.26;
                                    } else {
                                        if (anios_antiguedad >= 8 && anios_antiguedad <= 10) {
                                            bono_antiguedad = 1145.88;
                                        } else {
                                            if (anios_antiguedad >= 11 && anios_antiguedad <= 14) {
                                                bono_antiguedad = 1655.16;
                                            } else {
                                                if (anios_antiguedad >= 15 && anios_antiguedad <= 19) {
                                                    bono_antiguedad = 2164.44;
                                                } else {
                                                    if (anios_antiguedad >= 20 && anios_antiguedad <= 24) {
                                                        bono_antiguedad = 2673.72;
                                                    } 
                                                }
    
                                            }
                                        }
                                    }
                                }
                                PagoDiasTrabajados = ((haber_basico / 30) * params.dias_pagados);
                                TOTALganado = parseInt(haber_basico) + parseInt(params.otros_bonos) + parseInt(params.bono_produccion) +
                                    parseInt(IMPORTEHorasExtras) + bono_antiguedad;
                                if(TOTALganado<13000){
                                    
                                 aporte_nacional_solidario =0;
    
                                }else{
                                    if(TOTALganado>=13000 && TOTALganado<25000){
                                        
                                        aporte_nacional_solidario = (( TOTALganado - 13000 )/100)
    
                                    }else{
                                        if(TOTALganado>=25000 && TOTALganado<35000){
                                            aporte_nacional_solidario =  (((TOTALganado - 25000 )*5)/100)
        
                                        }else{
                                            if(TOTALganado>35000){
                                                aporte_nacional_solidario =  (((TOTALganado - 35000 )*10)/100)
        
                                            }
                                            else{console.log('error !!')}
                                        }
                                    }
                                }
                                console.log('TOTAL GANADO', TOTALganado)
                                descuento_retraso = (((TOTALganado / 30) / 8) / 60);
                                console.log('descuento_retraso GANADO', descuento_retraso)
                                console.log('minutos GANADO', total_minutos)
                                descuentosPOrRetraso = descuento_retraso * total_minutos;
                                console.log('descuento por retraso', parseInt(descuentosPOrRetraso))
                                // console.log('descuento por retraso',descuentosPOrRetraso)
                                AFP = (TOTALganado * 12.71) / 100;
                                TOTALdescuentos = AFP + parseInt(aporte_nacional_solidario) + parseInt(params.anticipos) + parseInt(params.otros_descuentos) + parseInt(descuentosPOrRetraso);
                                //#endregion
                                planilla.idPlanillaMayor = params.idPlanillaMayor;
                                planilla.idEmpleadoPlanilla = params.idEmpleadoPlanilla;
                                planilla.idusuario = 'asd';//params.idusuario;
                                //planilla.ocupacion = params.ocupacion;
                                //planilla.fecha_ingreso = params.fecha_ingreso;
                                planilla.dias_pagados = params.dias_pagados;
                                planilla.haber_basico = haber_basico.toFixed(3);
                                planilla.total_dias_pagados = PagoDiasTrabajados;
                                planilla.bono_antiguedad = bono_antiguedad.toFixed(3);
                                planilla.horas_extras = params.horas_extras;
                                planilla.importe_horas_extras = IMPORTEHorasExtras.toFixed(3);
                                planilla.bono_produccion = params.bono_produccion;
                                planilla.otros_bonos = params.otros_bonos;
                                planilla.total_ganado = TOTALganado.toFixed(3);
                                planilla.monto_afp = AFP.toFixed(3);
                                planilla.aporte_nal_solidario = aporte_nacional_solidario.toFixed(3);
                                planilla.rc_iva = params.rc_iva;
                                planilla.anticipos = params.anticipos;
                                planilla.otros_descuentos = params.otros_descuentos;
                                planilla.total_descuentos = TOTALdescuentos.toFixed(3);
                                planilla.liquido_pagable = TOTALganado.toFixed(3) - TOTALdescuentos.toFixed(3);
                                planilla.minutos_retraso = total_minutos;
                                planilla.save((err, planilla_result) => {
                                    if (err) { return res.status(500).send({ message: "Error al guardar los datos" }) }
                                    if (!planilla_result) { return res.status(404).send({ message: "No se guardo correctamente la planilla" }) }
                                    return res.status(200).send({ planilla: planilla_result })
                                })
    
    
    
    
                            }
                        }
                    })
    
                }
            } else {
               res.status(403).send({message:'NO EXISTEN REGISTROS DE MARCADO DE HORAS'})
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