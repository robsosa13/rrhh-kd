var PerfilEmpleado = require('../models/perfilEmpleado');
var controller = {
    InsertPerfilEmpleado: function (req, res) {
        var perfilEmpleado = new PerfilEmpleado();
        var params = req.body;
        perfilEmpleado.nombres = params.nombres;
        perfilEmpleado.apellidos = params.apellidos;
        perfilEmpleado.tel_celular = params.tel_celular;
        perfilEmpleado.tel_fijo = params.tel_fijo;
        perfilEmpleado.tipo_documento = params.tipo_documento;
        perfilEmpleado.num_documento = params.num_documento;
        perfilEmpleado.fec_nacimiento = params.fec_nacimiento;
        perfilEmpleado.sexo = params.sexo; 
        perfilEmpleado.direccion = params.direccion;
        perfilEmpleado.estado_civil = params.estado_civil;
        perfilEmpleado.estado = params.estado;
        perfilEmpleado.usuario = params.usuario;
        perfilEmpleado.save((err, perfilResult) => {
            if (err) { return res.status(500).send({ message: "Error al guardar" }) }
            if (! perfilResult) { return res.status(404).send({ message: "No se guardo perfil" }) }
            return res.status(200).send({  perfilEmpleado:  perfilResult })
        })
    },
}
module.exports = controller;