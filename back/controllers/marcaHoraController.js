var MarcaHora = require('../models/marcaHora');
var EmpresaHorario = require('../models/empresaHorario');
var TipoHorario = require('../models/tipoHorario');
var EmpresaHorarioCalendario = require('../models/empresaHorarioCalendario');
var HistorialMinutosRetraso = require('../models/historialMinutosRetraso');

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
    var mar1, mar2, mar3, mar4, idEmpleado;
    // console.log('MES', año)
    // console.log('AÑO', mes)
    // console.log('DIA', dia)
    var HORA1 = fechaTest.getHours() + '(Hr.)' + (fechaTest.getMinutes()) + '(Min.)' + fechaTest.getSeconds() + '(Seg.)';
    // console.log(HORA1)
    // console.log(fechaTest)
    //VERIFICAR QUE HORARIO LE TOCA MARCAR
    var buscar = fechaTest.getDate() + fechaTest.getMonth() + 1 + fechaTest.getFullYear();
    MarcaHora.find({ fechaRegistro: buscar }).exec((err, MarcaHoraEmpleado) => {
        // console.log('aqui termin', MarcaHoraEmpleado)
        if (MarcaHoraEmpleado != '') {
            for (const item in MarcaHoraEmpleado) {
                idMarcaH = MarcaHoraEmpleado[item].id;
                mar1 = MarcaHoraEmpleado[item].marcaH1;
                mar2 = MarcaHoraEmpleado[item].marcaH2;
                mar3 = MarcaHoraEmpleado[item].marcaH3;
                mar4 = MarcaHoraEmpleado[item].marcaH4;
                idEmpleado = MarcaHoraEmpleado[item].idEmpleado;
            }
            if (mar2 != null) {
                if (mar3 != null) {
                    if (mar4 != null) {
                        console.log('NO HAY MAS REGISTROS .....TERMINA')
                        //NO ENCUENTRA ALGO Y EXISTE ALGUN ERROR
                    } else {

                        marcaHora.idEmpleado = data.idEmpleado;
                        marcaHora.idEmpresa = data.idEmpresa;
                        //marcaHora.marcah4 = marcah4;

                        MarcaHora.findOneAndUpdate({ _id: idMarcaH }, { $set: { marcaH4: fechaTest } }, { multi: true }, (err, activo_edit) => {

                            if (err) {
                                // res.status(500).send({ message: 'Error en el servidor' });
                            } else {
                                if (activo_edit) {
                                    EmpresaHorario.findOne({ mes: mes, anio: año }).exec((err, empleadoMH) => {
                                        console.log('paso1')
                                        id_calendario = empleadoMH._id
                                        // console.log('MANDAMOS mes ', empleadoMH.mes)
                                        // console.log('MANDAMOS AÑO ', empleadoMH.anio)
                                        // console.log('id calandario', id_calendario)
                                        //LISTAMOS LOS DIAS DEL MES Y SUS RESPECTIVOS HORARIOS
                                        EmpresaHorarioCalendario.find({ idEmpresaHorario: id_calendario }).sort({ fecha: 'asc' }).exec((err, horario_calenda) => {
                                            //console.log('result2', horario_calenda)
                                            for (const item in horario_calenda) {
                                                //console.log('1',horario_calenda[item].fecha.getDate())
                                                //console.log('ID !!!',)
                                                //console.log('2',fechaTest.getDate())

                                                if (horario_calenda[item].fecha.getDate() === fechaTest.getDate()) {
                                                    TipoHorario.find({ _id: horario_calenda[item].idTipoHorario }).exec((err, result) => {
                                                        //VERIFICAMOS !!
                                                        // console.log(fechaTest)
                                                        var hora_retraso, min_retraso, seg_retraso;
                                                        //hora_retraso= result.horario1;
                                                        for (const key in result) {
                                                            hora_retraso = parseInt(result[key].horario4H) - parseInt(fechaTest.getHours());
                                                            if (hora_retraso == 0) {
                                                                if (parseInt(result[key].horario4M) > parseInt(fechaTest.getMinutes())) {
                                                                    min_retraso = 0
                                                                } else {
                                                                    if (parseInt(result[key].horario4M) < parseInt(fechaTest.getMinutes())) {
                                                                        min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario4M)
                                                                    } else {
                                                                        min_retraso = 0
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                if (hora_retraso < 0) {
                                                                    min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario4M)
                                                                    if (min_retraso < 0) {
                                                                        min_retraso = min_retraso * -1;
                                                                    }
                                                                }
                                                                else {
                                                                    hora_retraso = 0
                                                                    min_retraso = 0
                                                                }
                                                            }
                                                            ///////////////////////CALCULAMOS LOS MINUTOS Y HORAS DE RETRASO MEDIO DIA //////////////////////////////
                                                            console.log('hora retraso', hora_retraso * -1)
                                                            console.log('min retraso', min_retraso)
                                                        }
                                                        res.status(200).send({ result: result })
                                                    })
                                                }
                                                // console.log('Mostramos todas los ids del mes calendario TIPO horario', horario_calenda[item].idTipoHorario);
                                                // console.log('Mostramos todas las fechas del mes calendario', horario_calenda[item].fecha);
                                                // console.log('Mostramos todas los dias calendario', horario_calenda[item].dia);
                                                // console.log('año solo', horario_calenda[item].fecha.getDate());
                                            }
                                        })
                                    })
                                    console.log('resultado final editado', activo_edit)



                                } else {
                                    // res.status(403).send({ message: 'No se edito el activo' });
                                }
                            }
                        });
                    }
                } else {
                    marcaHora.idEmpleado = data.idEmpleado;
                    marcaHora.idEmpresa = data.idEmpresa;
                    //marcaHora.marcaH3 = marcah3;
                    console.log('tesst !!!!!!!!!!!!!!!!!!!!!!!!!')
                    MarcaHora.findOneAndUpdate({ _id: idMarcaH }, { $set: { marcaH3: fechaTest } }, { multi: true }, (err, activo_edit) => {
                        console.log('tesst !!!!!!!!!!!!!!!!!!!!!!!!!')
                        if (err) {
                            // res.status(500).send({ message: 'Error en el servidor' });
                        } else {
                            if (activo_edit) {
                                EmpresaHorario.findOne({ mes: mes, anio: año }).exec((err, empleadoMH) => {
                                    console.log('3', empleadoMH)
                                    console.log('paso1')
                                    id_calendario = empleadoMH._id
                                    // console.log('MANDAMOS mes ', empleadoMH.mes)
                                    // console.log('MANDAMOS AÑO ', empleadoMH.anio)
                                    // console.log('id calandario', id_calendario)
                                    //LISTAMOS LOS DIAS DEL MES Y SUS RESPECTIVOS HORARIOS
                                    EmpresaHorarioCalendario.find({ idEmpresaHorario: id_calendario }).sort({ fecha: 'asc' }).exec((err, horario_calenda) => {
                                        //console.log('result2', horario_calenda)
                                        for (const item in horario_calenda) {
                                            //console.log('1',horario_calenda[item].fecha.getDate())
                                            //console.log('ID !!!',)
                                            //console.log('2',fechaTest.getDate())

                                            if (horario_calenda[item].fecha.getDate() === fechaTest.getDate()) {
                                                TipoHorario.find({ _id: horario_calenda[item].idTipoHorario }).exec((err, result) => {
                                                    //VERIFICAMOS !!
                                                    // console.log(fechaTest)
                                                    var hora_retraso, min_retraso, seg_retraso;
                                                    //hora_retraso= result.horario1;
                                                    for (const key in result) {
                                                        hora_retraso = parseInt(result[key].horario3H) - parseInt(fechaTest.getHours());
                                                        if (hora_retraso == 0) {
                                                            if (parseInt(result[key].horario3M) > parseInt(fechaTest.getMinutes())) {
                                                                min_retraso = 0
                                                            } else {
                                                                if (parseInt(result[key].horario3M) < parseInt(fechaTest.getMinutes())) {
                                                                    min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario3M)
                                                                } else {
                                                                    min_retraso = 0
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            if (hora_retraso < 0) {
                                                                min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario3M)
                                                                if (min_retraso < 0) {
                                                                    min_retraso = min_retraso * -1;
                                                                }
                                                            }
                                                            else {
                                                                hora_retraso = 0
                                                                min_retraso = 0
                                                            }
                                                        }
                                                        ///////////////////////CALCULAMOS LOS MINUTOS Y HORAS DE RETRASO MEDIO DIA //////////////////////////////
                                                        console.log('hora retraso', hora_retraso * -1)
                                                        console.log('min retraso', min_retraso)
                                                    }
                                                    res.status(200).send({ result: result })
                                                })
                                            }
                                            // console.log('Mostramos todas los ids del mes calendario TIPO horario', horario_calenda[item].idTipoHorario);
                                            // console.log('Mostramos todas las fechas del mes calendario', horario_calenda[item].fecha);
                                            // console.log('Mostramos todas los dias calendario', horario_calenda[item].dia);
                                            // console.log('año solo', horario_calenda[item].fecha.getDate());
                                        }
                                    })
                                })
                                console.log('resultado final editado', activo_edit)



                            } else {
                                // res.status(403).send({ message: 'No se edito el activo' });
                            }
                        }
                    });
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
                            EmpresaHorario.findOne({ mes: mes, anio: año }).exec((err, empleadoMH) => {
                                console.log('paso1')
                                id_calendario = empleadoMH._id
                                // console.log('MANDAMOS mes ', empleadoMH.mes)
                                // console.log('MANDAMOS AÑO ', empleadoMH.anio)
                                // console.log('id calandario', id_calendario)
                                //LISTAMOS LOS DIAS DEL MES Y SUS RESPECTIVOS HORARIOS
                                EmpresaHorarioCalendario.find({ idEmpresaHorario: id_calendario }).sort({ fecha: 'asc' }).exec((err, horario_calenda) => {
                                    //console.log('result2', horario_calenda)
                                    for (const item in horario_calenda) {
                                        //console.log('1',horario_calenda[item].fecha.getDate())
                                        //console.log('ID !!!',)
                                        //console.log('2',fechaTest.getDate())

                                        if (horario_calenda[item].fecha.getDate() === fechaTest.getDate()) {
                                            TipoHorario.find({ _id: horario_calenda[item].idTipoHorario }).exec((err, result) => {
                                                //VERIFICAMOS !!
                                                // console.log(fechaTest)
                                                var hora_retraso, min_retraso, seg_retraso;
                                                //hora_retraso= result.horario1;
                                                for (const key in result) {
                                                    hora_retraso = parseInt(result[key].horario2H) - parseInt(fechaTest.getHours());
                                                    if (hora_retraso == 0) {
                                                        if (parseInt(result[key].horario2M) > parseInt(fechaTest.getMinutes())) {
                                                            min_retraso = 0
                                                        } else {
                                                            if (parseInt(result[key].horario2M) < parseInt(fechaTest.getMinutes())) {
                                                                min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario2M)
                                                            } else {
                                                                min_retraso = 0
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if (hora_retraso < 0) {
                                                            min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario2M)
                                                            if (min_retraso < 0) {
                                                                min_retraso = min_retraso * -1;
                                                            }
                                                        }
                                                        else {
                                                            hora_retraso = 0
                                                            min_retraso = 0
                                                        }
                                                    }
                                                    ///////////////////////CALCULAMOS LOS MINUTOS Y HORAS DE RETRASO MEDIO DIA //////////////////////////////
                                                    console.log('hora retraso', hora_retraso * -1)
                                                    console.log('min retraso', min_retraso)
                                                }
                                                res.status(200).send({ result: result })
                                            })
                                        }
                                        // console.log('Mostramos todas los ids del mes calendario TIPO horario', horario_calenda[item].idTipoHorario);
                                        // console.log('Mostramos todas las fechas del mes calendario', horario_calenda[item].fecha);
                                        // console.log('Mostramos todas los dias calendario', horario_calenda[item].dia);
                                        // console.log('año solo', horario_calenda[item].fecha.getDate());
                                    }
                                })
                            })
                            console.log('resultado final editado', activo_edit)
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

            var fecharegistroMarca = fechaTest.getDate() + fechaTest.getMonth() + 1 + fechaTest.getFullYear();
            //console.log('tstaa', espero)
            marcaHora.idEmpleado = data.idEmpleado;
            marcaHora.idEmpresa = data.idEmpresa;
            marcaHora.marcaH1 = fechaTest;
            marcaHora.marcaH2 = '';
            marcaHora.marcaH3 = '';
            marcaHora.marcaH4 = '';
            marcaHora.fechaRegistro = fecharegistroMarca
            marcaHora.save((err, marcaHora_save) => {
                if (marcaHora_save) {
                    //AÑO Y MES CON LO QUE COMPARA
                    EmpresaHorario.findOne({ mes: mes, anio: año }).exec((err, empleadoMH) => {
                        //console.log('paso1')
                        id_calendario = empleadoMH._id
                        // console.log('MANDAMOS mes ', empleadoMH.mes)
                        // console.log('MANDAMOS AÑO ', empleadoMH.anio)
                        // console.log('id calandario', id_calendario)
                        //LISTAMOS LOS DIAS DEL MES Y SUS RESPECTIVOS HORARIOS
                        EmpresaHorarioCalendario.find({ idEmpresaHorario: id_calendario }).sort({ fecha: 'asc' }).exec((err, horario_calenda) => {
                            //console.log('result2', horario_calenda)
                            for (const item in horario_calenda) {
                                //console.log('1',horario_calenda[item].fecha.getDate())
                                //console.log('ID !!!',)
                                //console.log('2',fechaTest.getDate())

                                if (horario_calenda[item].fecha.getDate() === fechaTest.getDate()) {
                                    TipoHorario.find({ _id: horario_calenda[item].idTipoHorario }).exec((err, result) => {
                                        //VERIFICAMOS !!
                                        console.log(fechaTest)
                                        var hora_retraso, min_retraso, seg_retraso;
                                        // hora_retraso= result.horario1;
                                        for (const key in result) {

                                            hora_retraso = parseInt(result[key].horario1H) - parseInt(fechaTest.getHours());
                                            if (hora_retraso == 0) {
                                                if (parseInt(result[key].horario1M) > parseInt(fechaTest.getMinutes())) {
                                                    min_retraso = 0
                                                } else {
                                                    if (parseInt(result[key].horario1M) < parseInt(fechaTest.getMinutes())) {
                                                        min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario1M)
                                                    } else {
                                                        min_retraso = 0
                                                    }
                                                }
                                                // 12.30 INGRESO
                                                // 13.40 SALIDA
                                            } else {
                                                if (hora_retraso < 0) {
                                                    min_retraso = parseInt(fechaTest.getMinutes()) - parseInt(result[key].horario1M)
                                                    if (min_retraso < 0) {
                                                        min_retraso = min_retraso * -1;
                                                    }
                                                }
                                                else {
                                                    hora_retraso = 0
                                                    min_retraso = 0
                                                }
                                            }
                                            ///////////////////////CALCULAMOS LOS MINUTOS Y HORAS DE RETRASO MEDIO DIA //////////////////////////////
                                            console.log('hora retraso111', hora_retraso)
                                            console.log('minu retraso22222', min_retraso)
                                            HistorialMinutosRetraso.find({ idEmpleado: idEmpleado }).exec((err, resultfinal) => {
                                                if (err) {

                                                } else {

                                                    if (!resultfinal) {
                                                       console.log('neli')
                                                    }
                                                    else {
                                                        console.log('test!!!!!!!!!!!!!!!!!')
                                                        var historialMinutosRetraso = new HistorialMinutosRetraso();
                                                        historialMinutosRetraso.minutosRetraso=min_retraso
                                                        historialMinutosRetraso.horasRetraso=hora_retraso
                                                        historialMinutosRetraso.mes='asd'
                                                        historialMinutosRetraso.idEmpleado='asd'
                                                        historialMinutosRetraso.save((err, marcaHora_save) => {
                                                            if (marcaHora_save) {
                                                                //res.status(200).send({message:'OK !!'})
                                                                //res.status(200).send({empresas:empresaLista});
                                                            } else {

                                                                //res.status(403).send({message: 'No hay ningun registro con ese titulo'});
                                                            }
                                                        })
                                                     }
                                                }
                                            })
                                            // hora_retraso=parseInt( result[key].horario1H)-parseInt( fechaTest.getHours());
                                            // min_retraso=parseInt(result[key].horario1M)-parseInt(fechaTest.getMinutes());
                                            // //CALCULAMOS LOS MINUTOS Y HORAS DE RETRASO POR  LA MAÑANA
                                            // console.log('hora retraso',hora_retraso*-1)
                                            // console.log('hora retraso',min_retraso*-1) 
                                        }
                                        res.status(200).send({ result: result })
                                    })
                                }
                                // console.log('Mostramos todas los ids del mes calendario TIPO horario', horario_calenda[item].idTipoHorario);
                                // console.log('Mostramos todas las fechas del mes calendario', horario_calenda[item].fecha);
                                // console.log('Mostramos todas los dias calendario', horario_calenda[item].dia);
                                // console.log('año solo', horario_calenda[item].fecha.getDate());
                            }
                        })
                    })
                } else {
                    //  res.status(500).send(err);
                }
            });
        }
    })
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