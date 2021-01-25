var MarcaHora = require('../models/marcaHora');
var EmpresaHorario = require('../models/empresaHorario');
var EmpresaHorarioCalendario = require('../models/empresaHorarioCalendario');

function registrarMarcaHora(req, res) {


    let data = req.body;
    var marcaHora = new MarcaHora();
    var fechaTest
    var marcah1 = new Date(), marcah2 = new Date(), marcah3 = new Date(), marcah4 = new Date();
    fechaTest = new Date();
    var id_calendario;
    var testdate = new Date()
    // var id_calendario;
    var año, dia, mes, idMarcaH;
    año = fechaTest.getFullYear()
    mes = fechaTest.getMonth() + 1
    dia = fechaTest.getDate();
    var buscar = '01/01/2021'
    console.log('MES', año)
    console.log('AÑO', mes)
    console.log('DIA', dia)
    var HORA1 = fechaTest.getHours() + '(Hr.)' + (fechaTest.getMinutes()) + '(Min.)' + fechaTest.getSeconds() + '(Seg.)';
    console.log(HORA1)
    console.log(fechaTest)
    //VERIFICAR QUE HORARIO LE TOCA MARCAR
    MarcaHora.find({ fechaRegistro: buscar }).exec((err, MarcaHoraEmpleado) => {
        console.log('aqui termin', MarcaHoraEmpleado)
        if (MarcaHoraEmpleado != '') {
            for (const item in MarcaHoraEmpleado) {
                idMarcaH = MarcaHoraEmpleado[item].id;
            }

            if (MarcaHoraEmpleado.marcaH2 != null) {
                console.log('2')
                if (MarcaHoraEmpleado.marcaH3 != null) {
                    console.log('3')
                    if (MarcaHoraEmpleado.marcaH4 != null) {
                        console.log('aqui termin')
                        //NO ENCUENTRA ALGO Y EXISTE ALGUN ERROR
                    } else {
                        console.log('vacio')
                        marcaHora.idEmpleado = data.idEmpleado;
                        marcaHora.idEmpresa = data.idEmpresa;
                        marcaHora.marcah4 = marcah4;

                        MarcaHora.findOneAndUpdate(MarcaHoraEmpleado.id, { marcah4: data.marcah4 }, (err, tipo_edit) => {
                            if (tipo_edit) {
                                //  res.status(200).send({ tipoHorario: tipo_edit });
                            } else {
                                res.status(500).send(err);
                            }
                        })
                    }
                } else {
                    marcaHora.idEmpleado = data.idEmpleado;
                    marcaHora.idEmpresa = data.idEmpresa;
                    marcaHora.marcaH3 = marcah3;
                    MarcaHora.findOneAndUpdate(MarcaHoraEmpleado.id, { marcaH3: data.marcaH3 }, (err, tipo_edit) => {
                        if (tipo_edit) {
                            //  res.status(200).send({ tipoHorario: tipo_edit });
                        } else {
                            res.status(500).send(err);
                        }
                    })
                }
            } else {
                //console.log('entra aquiid',MarcaHoraEmpleado.marcaH1)
                marcaHora.idEmpleado = data.idEmpleado;
                marcaHora.idEmpresa = data.idEmpresa;
                console.log('idpa revisar', idMarcaH)
                //marcaHora.marcaH2 = marcah2;
                MarcaHora.findOneAndUpdate({ _id: idMarcaH }, { $set: { marcaH2: fechaTest } }, { multi: true }, (err, activo_edit) => {

                    if (err) {
                        // res.status(500).send({ message: 'Error en el servidor' });
                    } else {
                        if (activo_edit) {
                            console.log('resultado final editado', activo_edit)
                            res.status(200).send({ message: 'SUCCESS !!' });
                            // res.status(200).send({ activo: activo_edit });
                        } else {
                            // res.status(403).send({ message: 'No se edito el activo' });
                        }
                    }
                });
                // MarcaHora.findByIdAndUpdate(idMarcaH, { marcah2: fechaTest }, (err, tipo_edit) => {
                //     console.log('resultado final2',tipo_edit)
                //     if (tipo_edit) {
                //         console.log('resultado final',fechaTest)
                //         console.log('resultado final',tipo_edit)
                //         //  res.status(200).send({ tipoHorario: tipo_edit });
                //     } else {
                //         res.status(500).send(err);
                //     }
                // })
            }

        }
        else {
            console.log('!!!')
            var espero = data.fechaRegistro;
            console.log('tstaa', espero)
            marcaHora.idEmpleado = data.idEmpleado;
            marcaHora.idEmpresa = data.idEmpresa;
            marcaHora.marcaH1 = fechaTest;
            marcaHora.marcaH2 = '';
            marcaHora.marcaH3 = '';
            marcaHora.marcaH4 = '';
            marcaHora.fechaRegistro = buscar
            console.log('result', marcaHora)

            marcaHora.save((err, marcaHora_save) => {
                if (marcaHora_save) {
                    console.log(marcaHora_save)
                    //AÑO Y MES CON LO QUE COMPARA
                    EmpresaHorario.findOne({ mes: mes, anio: año }).exec((err, empleadoMH) => {
                        id_calendario = empleadoMH._id
                        console.log('MANDAMOS mes ', empleadoMH.mes)
                        console.log('MANDAMOS AÑO ', empleadoMH.anio)
                        console.log('id calandario', id_calendario)
                        //LISTAMOS LOS DIAS DEL MES Y SUS RESPECTIVOS HORARIOS
                        EmpresaHorarioCalendario.find({ idEmpresaHorario: id_calendario }).sort({ fecha: 'asc' }).exec((err, horario_calenda) => {
                            //console.log('result2', horario_calenda)
                            for (const item in horario_calenda) {
                            if(horario_calenda[item].dia===fechaTest.getDate()){
                                TipoHorario.find({id:horario_calenda[item].idTipoHorario}).exec((err,result)=>{
                                    //VERIFICAMOS !!

                                })
                                     
                            }
                                console.log('Mostramos todas los ids del mes calendario TIPO horario', horario_calenda[item].idTipoHorario);
                                console.log('Mostramos todas las fechas del mes calendario', horario_calenda[item].fecha);
                                console.log('Mostramos todas los dias calendario', horario_calenda[item].dia);
                                console.log('año solo', horario_calenda[item].fecha.getDate());
                            }
                        })
                    })
                    res.status(200).send({ message: 'SUCCESS !!' });
                    // res.status(200).send({ marcaHora: marcaHora_save });
                } else {
                    //  res.status(500).send(err);
                }
            });
        }
    })

    // if (f1.getTime() == f2.getTime()) {
    //     console.log("Son la misma fecha");
    // }
    //AÑO Y MES CON LO QUE COMPARA
    // // // // // EmpresaHorario.findOne({ mes: mes, anio: año }).exec((err, empleadoMH) => {
    // // // // //     id_calendario = empleadoMH._id
    // // // // //     console.log('MANDAMOS mes ', empleadoMH.mes)
    // // // // //     console.log('MANDAMOS AÑO ', empleadoMH.anio)
    // // // // //     console.log('id', id_calendario)
    //LISTAMOS LOS DIAS DEL MES Y SUS RESPECTIVOS HORARIOS
    // //     EmpresaHorarioCalendario.find({ idEmpresaHorario: id_calendario }).sort({ fecha: 'asc' }).exec((err, horario_calenda) => {
    // //         //console.log('result2', horario_calenda)
    // //         for (const item in horario_calenda) {
    // //             console.log('Mostramos todas los ids del mes calendario TIPO horario', horario_calenda[item].idTipoHorario);
    // //             console.log('Mostramos todas las fechas del mes calendario', horario_calenda[item].fecha);
    // //             console.log('Mostramos todas los dias calendario', horario_calenda[item].dia);
    // //             console.log('año solo', horario_calenda[item].fecha.getDate());
    // //         }
    // //     })
    // // })
    // var fecha1 = marcah1.getDate() + '-' + (marcah1.getMonth() + 1) + '-' + marcah1.getFullYear();
    // var fecha2 = marcah2.getDate() + '-' + (marcah2.getMonth() + 1) + '-' + marcah2.getFullYear();
    // var fecha3 = marcah3.getDate() + '-' + (marcah3.getMonth() + 1) + '-' + marcah3.getFullYear();
    // var fecha4 = marcah4.getDate() + '-' + (marcah4.getMonth() + 1) + '-' + marcah4.getFullYear();
    // var HORA1 = marcah1.getHours() + '(Hr.)' + (marcah1.getMinutes()) + '(Min.)' + marcah1.getSeconds() + '(Seg.)';
    // var HORA2 = marcah2.getHours() + '(Hr.)' + (marcah2.getMinutes()) + '(Min.)' + marcah2.getSeconds() + '(Seg.)';
    // var HORA3 = marcah3.getHours() + '(Hr.)' + (marcah3.getMinutes()) + '(Min.)' + marcah3.getSeconds() + '(Seg.)';
    // var HORA4 = marcah4.getHours() + '(Hr.)' + (marcah4.getMinutes()) + '(Min.)' + marcah4.getSeconds() + '(Seg.)';
    // var fechaHora1 = HORA1
    // var fechaHora2 = HORA2
    // var fechaHora3 = HORA3
    // var fechaHora4 = HORA4
    // marcaHora.idEmpleado = data.idEmpleado;
    // marcaHora.idEmpresa = data.idEmpresa;
    // marcaHora.marcaH1 = fechaHora1;
    // marcaHora.marcaH2 = fechaHora2;
    // marcaHora.marcaH3 = fechaHora3;
    // marcaHora.marcaH4 = fechaHora4;
    // marcaHora.save((err, marcaHora_save) => {
    //     if (marcaHora_save) {
    //         //console.log(marcaHora_save)
    //         res.status(200).send({ marcaHora: marcaHora_save });
    //     } else {
    //         res.status(500).send(err);
    //     }
    // });
    console.log('FIN !!');
}
function getMarcaHoraEmpleado(req, res) {

    MarcaHora.find({}).exec((err, empleadoMH) => {
        if (err) { return res.status(500).send({ message: 'Error la devolver los datos' }); }
        if (!empleadoMH) { return res.status(404).send({ message: 'No hay tipoHorario' }); }
        return res.status(200).send({ empleadoMH });
    })
}
function get_HorarioById(req, res) {
    var id = req.params['id'];
    MarcaHora.findById(id, (err, res_horario) => {
        if (res_horario) {
            res.status(200).send({ TipoHorario: res_horario });
        }
    })
}
function editarTipoHorario(req, res) {
    let id = req.params['id'];
    let data = req.body;

    MarcaHora.findOneAndUpdate(id, { nombre: data.nombre }, (err, tipo_edit) => {
        if (tipo_edit) {
            res.status(200).send({ tipoHorario: tipo_edit });
        } else {
            res.status(500).send(err);
        }
    })
}

function eliminarTipoHorario(req, res) {
    let id = req.params['id'];

    MarcaHora.findByIdAndRemove(id, (err, tipo_deleted) => {
        if (tipo_deleted) {
            res.status(200).send({ tipoHorario: tipo_deleted });
        } else {
            res.status(500).send(err);
            test()
        }
    })
}

module.exports = {
    registrarMarcaHora, getMarcaHoraEmpleado
}