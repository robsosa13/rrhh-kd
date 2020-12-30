var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT ||  4201;
var app = express();
//ROUTES 
var perfilEmpleadoRoutes = require('./routes/perfilEmpleado');
var planilla_routes = require('./routes/planilla');
var planilla_mayor_routes= require('./routes/planillaMayor');
var empleado_planilla_routes= require('./routes/empleadoPlanilla');
var usuario_routes= require('./routes/usuario');
var marcaHora_routes= require('./routes/marcaHora');
var tipoHorario_routes= require('./routes/tipoHorario');
var empresaHorario_routes= require('./routes/empresaHorario');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
//Conection db
mongoose.connect('mongodb://localhost:27017/rrhh',{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
    if(err){
        throw err;
    }
    else{
        console.log("Corriendo servidor");
        app.listen(port, function(){
            console.log("Servidor corriendo en el puerto " + port);           
        });
    }
});
app.use('/api',perfilEmpleadoRoutes);
app.use('/api',planilla_routes);
app.use('/api',planilla_mayor_routes);
app.use('/api',empleado_planilla_routes); 
//app.use('/api',usuario_routes); 
app.use('/api',marcaHora_routes); 
app.use('/api',tipoHorario_routes); 
app.use('/api',empresaHorario_routes); 
module.exports = app;