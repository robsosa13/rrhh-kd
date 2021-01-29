var MarcaHora = require('../models/marcaHora');
var EmpresaHorario = require('../models/empresaHorario');
var TipoHorario = require('../models/tipoHorario');
var EmpresaHorarioCalendario = require('../models/empresaHorarioCalendario');
var HistorialMinutosRetraso = require('../models/historialMinutosRetraso');

function registrarMarcaHora(req, res) {

    let data = req.body;
    var marcaHora = new MarcaHora();
    var fechaTest= new Date();
    var id_calendario;
    var id_empleado = data.idEmpleado
    // var id_calendario;
    var año, dia, mes, idMarcaH;
    año = fechaTest.getFullYear()
    mes = fechaTest.getMonth() + 1 
    dia = fechaTest.getDate();
    var mar1, mar2, mar3, mar4, idEmpleado;
    var HORA1 = fechaTest.getHours() + '(Hr.)' + (fechaTest.getMinutes()) + '(Min.)' + fechaTest.getSeconds() + '(Seg.)';
    //VERIFICAR QUE HORARIO LE TOCA MARCAR
    var buscar = fechaTest.getDate() + fechaTest.getMonth() + 1 + fechaTest.getFullYear();
    MarcaHora.find({ fechaRegistro: buscar,idEmpleado:id_empleado }).exec((err, MarcaHoraEmpleado) => {
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
                        marcaHora.idEmpleado = idEmpleado;
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
                                                            var sumMin ,sumHora;
                                                            HistorialMinutosRetraso.find({ idEmpleadoPlanilla: id_empleado,mes:mes }).exec((err, resultfinal) => {
                                                                if (err) {
                                                                } else {
                                                                    if (resultfinal) {
                                                                        console.log('encontro')
                                                                        /**
                                                                         * SUMAMOS LOS MINUTOS MENSUALES DE RETRASO
                                                                         */
                                                                        for (const item in resultfinal) {
                                                                            sumMin=min_retraso+ resultfinal[item].minutosRetraso;
                                                                            sumHora=hora_retraso+ resultfinal[item].horasRetraso;
                                                                            
                                                                            
                                                                        }
                                                                        HistorialMinutosRetraso.findOneAndUpdate({ idEmpleadoPlanilla: id_empleado,mes:mes }, { $set: { minutosRetraso: sumMin,horasRetraso:sumHora } }, { multi: true }, (err, activo_edit) => {
                                                                            console.log("EDITADO4 !!!!")
                                                                        })
                                                                    }
                                                                    else {
                                                                        console.log('no encontro')
                                                                        /**
                                                                         * 
                                                                         */
                
                                                                        var historialMinutosRetraso = new HistorialMinutosRetraso();
                                                                        historialMinutosRetraso.minutosRetraso=min_retraso
                                                                        historialMinutosRetraso.horasRetraso=hora_retraso
                                                                        historialMinutosRetraso.mes='1'
                                                                        historialMinutosRetraso.año='2021'
                                                                        historialMinutosRetraso.idEmpleadoPlanilla=id_empleado
                                                                        historialMinutosRetraso.save((err, marcaHora_save) => {
                                                                            if (marcaHora_save) {
                
                                                                                console.log("EDITADO4 !!!!")
                                                                                //res.status(200).send({empresas:empresaLista});
                                                                            } else {
                
                                                                                //res.status(403).send({message: 'No hay ningun registro con ese titulo'});
                                                                            }
                                                                        })
                                                                     }
                                                                }
                                                            })
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
                    marcaHora.idEmpleado = idEmpleado;
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
                                                        var sumMin ,sumHora;
                                                        HistorialMinutosRetraso.find({ idEmpleadoPlanilla: id_empleado,mes:mes }).exec((err, resultfinal) => {
                                                            if (err) {
                                                            } else {
                                                                if (resultfinal) {
                                                                    /**
                                                                     * SUMAMOS LOS MINUTOS MENSUALES DE RETRASO
                                                                     */
                                                                    for (const item in resultfinal) {
                                                                        sumMin=min_retraso+ resultfinal[item].minutosRetraso;
                                                                        sumHora=hora_retraso+ resultfinal[item].horasRetraso;
                                                                        
                                                                        
                                                                    }
                                                                    HistorialMinutosRetraso.findOneAndUpdate({ idEmpleadoPlanilla: id_empleado,mes:mes }, { $set: { minutosRetraso: sumMin,horasRetraso:sumHora } }, { multi: true }, (err, activo_edit) => {
                                                                        console.log("EDITADO3 !!!!")
                                                                    })
                                                                }
                                                                else {
                                                                    /**
                                                                     * 
                                                                     */
            
                                                                    var historialMinutosRetraso = new HistorialMinutosRetraso();
                                                                    historialMinutosRetraso.minutosRetraso=min_retraso
                                                                    historialMinutosRetraso.horasRetraso=hora_retraso
                                                                    historialMinutosRetraso.mes='1'
                                                                    historialMinutosRetraso.año='2021'
                                                                    historialMinutosRetraso.idEmpleadoPlanilla=id_empleado
                                                                    historialMinutosRetraso.save((err, marcaHora_save) => {
                                                                        if (marcaHora_save) {
            
                                                                            console.log("EDITADO3 !!!!")
                                                                            //res.status(200).send({empresas:empresaLista});
                                                                        } else {
            
                                                                            //res.status(403).send({message: 'No hay ningun registro con ese titulo'});
                                                                        }
                                                                    })
                                                                 }
                                                            }
                                                        })
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
                marcaHora.idEmpleado = idEmpleado;
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
                                                    var sumMin ,sumHora;
                                                    console.log('BUSCAR',id_empleado)
                                                    console.log('BUSCAR',mes)
                                                    HistorialMinutosRetraso.find({ idEmpleadoPlanilla: id_empleado,mes:mes }).exec((err, resultfinal) => {
                                                        if (err) {
                                                        } else {
                                                            if (resultfinal) {
                                                                console.log('PROBANDO1 ')
                                                                /**
                                                                 * SUMAMOS LOS MINUTOS MENSUALES DE RETRASO
                                                                 */
                                                                for (const item in resultfinal) {
                                                                    sumMin=min_retraso+ resultfinal[item].minutosRetraso;
                                                                    sumHora=hora_retraso+ resultfinal[item].horasRetraso;
                                                                    
                                                                    
                                                                }
                                                                HistorialMinutosRetraso.findOneAndUpdate({ idEmpleadoPlanilla: id_empleado,mes:mes }, { $set: { minutosRetraso: sumMin,horasRetraso:sumHora } }, { multi: true }, (err, activo_edit) => {
                                                                    console.log("EDITADO2 !!!!")
                                                                })
                                                            }
                                                            else {
                                                                /**
                                                                 * 
                                                                 */
                                                                console.log('PROBANDO2 ')
                                                                var historialMinutosRetraso = new HistorialMinutosRetraso();
                                                                historialMinutosRetraso.minutosRetraso=min_retraso
                                                                historialMinutosRetraso.horasRetraso=hora_retraso
                                                                historialMinutosRetraso.mes='1'
                                                                historialMinutosRetraso.año='2021'
                                                                historialMinutosRetraso.idEmpleadoPlanilla=id_empleado
                                                                historialMinutosRetraso.save((err, marcaHora_save) => {
                                                                    if (marcaHora_save) {
        
                                                                        console.log("EDITADO2 !!!!")
                                                                        //res.status(200).send({empresas:empresaLista});
                                                                    } else {
        
                                                                        //res.status(403).send({message: 'No hay ningun registro con ese titulo'});
                                                                    }
                                                                })
                                                             }
                                                        }
                                                    })
                                                    

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
           
                        console.log('IDE EMPLEADO !!!', id_empleado)
            marcaHora.idEmpleado = id_empleado;
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
                                            var sumMin ,sumHora;
                                            HistorialMinutosRetraso.find({ idEmpleadoPlanilla: id_empleado,mes:mes }).exec((err, resultfinal) => {
                                                if (err) {
                                                } else {
                                                    if (!resultfinal) {
                                                        /**
                                                         * SUMAMOS LOS MINUTOS MENSUALES DE RETRASO
                                                         */
                                                        for (const item in resultfinal) {
                                                            sumMin=min_retraso+ resultfinal[item].minutosRetraso;
                                                            sumHora=hora_retraso+ resultfinal[item].horasRetraso;
                                                            
                                                            
                                                        }
                                                        HistorialMinutosRetraso.findOneAndUpdate({ idEmpleadoPlanilla: id_empleado,mes:mes }, { $set: { minutosRetraso: sumMin,horasRetraso:sumHora } }, { multi: true }, (err, activo_edit) => {
                                                            console.log("EDITADO !!!!")
                                                        })
                                                    }
                                                    else {
                                                        /**
                                                         * 
                                                         */
                                                        console.log(id_empleado)
                                                        var historialMinutosRetraso = new HistorialMinutosRetraso();
                                                        historialMinutosRetraso.minutosRetraso=min_retraso
                                                        historialMinutosRetraso.horasRetraso=hora_retraso
                                                        historialMinutosRetraso.mes='1'
                                                        historialMinutosRetraso.año='2021'
                                                        historialMinutosRetraso.idEmpleadoPlanilla=id_empleado
                                                        historialMinutosRetraso.save((err, marcaHora_save) => {
                                                            if (marcaHora_save) {
                                                                    console.log("PERFECTO !!!!")
                                                               // res.status(200).send({message:'OK !!'})
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

}
function getMarcaHoraEmpleado(req, res) {

    MarcaHora.find({}).populate('idEmpleado').exec((err, empleadoMH) => {
        console.log(empleadoMH)
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