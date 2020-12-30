const { response } = require('express');
const fetch = require("node-fetch");
var PlanillaSueldos = require('../models/planillaSueldos');
var controller = {
    registrarPlanilla: function (req, res) {  

        var planilla = new PlanillaSueldos();
        var params = req.body;
        var AFP =0,descuentosPOrRetraso =0,descuento_retraso =0,PagoDiasTrabajados =0,TOTALganado=0;
         //Total dias pagados
       //#region CALCULOS
       PagoDiasTrabajados = ((params.haber_basico /30)*params.dias_pagados);
       descuento_retraso = ((((params.total_ganado/30)/100)/8)/60);
       descuentosPOrRetraso= descuento_retraso*params.minutos_retraso;
       TOTALganado = parseInt(params.haber_basico)+ parseInt(params.otros_bonos) + parseInt(params.bono_produccion)+
       parseInt(params.importe_horas_extras)+  parseInt(params.bono_antiguedad )+ parseInt(PagoDiasTrabajados);
       AFP = (TOTALganado*12.71)/100;
       TOTALdescuentos=AFP+ parseInt(params.aporte_nal_solidario)+ parseInt(params.anticipos)+ parseInt(params.otros_descuentos);
       //#endregion
      
       
        planilla.idPlanillaMayor=params.idPlanillaMayor;
        planilla.idEmpleadoPlanilla=params.idEmpleadoPlanilla;
        planilla.idusuario = 'asd';//params.idusuario;
        planilla.ocupacion = params.ocupacion;
        planilla.fecha_ingreso = params.fecha_ingreso;
        planilla.dias_pagados = params.dias_pagados;
        planilla.haber_basico = params.haber_basico;
        planilla.total_dias_pagados = PagoDiasTrabajados;
        planilla.bono_antiguedad = params.bono_antiguedad;
        planilla.horas_extras = params.horas_extras;
        planilla.importe_horas_extras = params.importe_horas_extras;
        planilla.bono_produccion = params.bono_produccion;
        planilla.otros_bonos = params.otros_bonos;
        planilla.total_ganado = TOTALganado;
        planilla.monto_afp = AFP;
        planilla.aporte_nal_solidario = params.aporte_nal_solidario;
        planilla.rc_iva = params.rc_iva;
        planilla.anticipos  = params.anticipos;
        planilla.otros_descuentos = params.otros_descuentos;
        planilla.total_descuentos = TOTALdescuentos;
        planilla.liquido_pagable  = TOTALganado -TOTALdescuentos ;
        planilla.minutos_retraso  = params.minutos_retraso;
        
        planilla.save((err, planilla_result) => {
            if (err) { return res.status(500).send({ message: "Error al guardar los datos" }) }
            if (!planilla_result) { return res.status(404).send({ message: "No se guardo correctamente la planilla" }) }
            return res.status(200).send({ planilla: planilla_result })
        })
    },
    getPlanilla:function(req,res){
        PlanillaSueldos.find({}).populate('idPlanillaMayor').populate('idEmpleadoPlanilla').exec((err, planillas) => {
            if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
            if (!planillas) { return res.status(404).send({ message: 'No hay planillas' }); }
            return res.status(200).send({ planillas });
        })
    },
    getPlanillaId:function(req,res){
        var idPlanillaMayor = req.params['id'];
        PlanillaSueldos.find({idPlanillaMayor:idPlanillaMayor}).populate('idPlanillaMayor').populate('idEmpleadoPlanilla').exec((err, planillas) => {
            if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
            if (!planillas) { return res.status(404).send({ message: 'No hay planillas' }); }
            return res.status(200).send({ planillas });
        })
    },
    getPlanillaCI:function(req,res){
        var CI = req.params['CI'];

    PlanillaSueldos.find({CI: new RegExp(CI,'i')}).exec((err,planilla_result)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(planilla_result){
                    res.status(200).send({planilla:planilla_result});
                }else{
                    res.status(404).send({message: 'No hay ningun registro'});
                }
            }
        });
    },
    detailPlanilla: function (req, res) {
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
    },
    deletePlanilla: function (req, res) {
        var planillaId = req.params.id;
        PlanillaSueldos.findByIdAndRemove(planillaId, (err, planillaRemoved) => {
            if (err) return res.status(500).send({ message: 'No se pudo borrar la planilla' })
            if (!planillaRemoved) return res.status(404).send({ message: 'NO se puede eliminar' })
            return res.status(200).send({
                planilla: planillaRemoved
            })
        })
    },
    test: function (req, res) {
     const url='https://www.etnassoft.com/api/v1/get/?id=589&callback=?'
     fetch(url)
     .then(response => response.json())
     .then(data=>{
                console.log(data);
     }).catch(err=>console.log(err))
    }
}
module.exports = controller;
