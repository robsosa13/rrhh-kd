var PlanillaMayor = require('../models/planillaMayor');
let response ={
    msg:"",
    exito:false
}
var controller = {
    registrarPlanillaMayor: function (req, res) {
        var planilla_mayor = new PlanillaMayor();
        var params = req.body;
        
        planilla_mayor.caja = params.caja;
        planilla_mayor.razon_social = params.razon_social;
        planilla_mayor.logo = params.logo;
        planilla_mayor.titulo = params.titulo;
        planilla_mayor.nit = params.nit;
        planilla_mayor.salario_minimo = params.salario_minimo;
        planilla_mayor.periodo_planilla = params.periodo_planilla;
        planilla_mayor.año_planilla = params.año_planilla;
        planilla_mayor.afp = params.afp;
        planilla_mayor.ciudad = params.ciudad;
        planilla_mayor.sucursal = params.sucursal;
        planilla_mayor.direccion = params.direccion;
        planilla_mayor.ufv_inicial = params.ufv_inicial;
        planilla_mayor.telefono = params.telefono;
        planilla_mayor.ufv_final = params.ufv_final;

        planilla_mayor.save((err, planilla_result) => {
            if (err) { return res.status(500).send({ message: "Error al guardar los datos" 
  

        }) }
            if (!planilla_result) { return res.status(404).send({ message: "No se guardo correctamente la planilla" }) }
            return res.status(200).send({ planilla_mayor: planilla_result })
        })
    },
    getPlanilla_mayor: function (req, res) {
        PlanillaMayor.find({}).exec((err, planillas) => {
            console.log(planillas)
            if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
            if (!planillas) { return res.status(404).send({ message: 'No hay planillas' }); }
            return res.status(200).send({planillas   });
        })
    },
    detailPlanilla: function (req, res) {
        var id = req.params.id;
        PlanillaMayor.find({ _id: id }).exec((err, planilla) => {
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
        PlanillaMayor.findByIdAndRemove(planillaId, (err, planillaRemoved) => {
            if (err) return res.status(500).send({ message: 'No se pudo borrar la planilla' })
            if (!planillaRemoved) return res.status(404).send({ message: 'NO se puede eliminar' })
            return res.status(200).send({
                planilla: planillaRemoved
            })
        })
    },
}
module.exports = controller;