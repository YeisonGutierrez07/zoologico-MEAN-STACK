'use strict';
var mongoose = require('mongoose');
var app = require('./app');
var port = 3789;

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo')
    .then(() => {
        console.log('la conexion ha sido exitosa');

        app.listen(port, () => {
            console.log("el servidor esta corriendo");
        })
    })
    .catch(err => console.log("err"));


