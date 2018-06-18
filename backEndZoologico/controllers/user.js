'use strict'
// Modulos
var bcrypt = require('bcrypt-nodejs');

// modulos
var User = require('../models/user');

function pruebas (req, res) {
    res.status(200).send({
        message: 'Probando el controlador de pruebas'
    });
}

function saveUser(req, res) {

    //Crear objeto usuario
    var user = new User();

    // Recoger parametros de la peticion
    var params = req.body;

    console.log(params);

    // ASIGNAR VALORES AL OBJETO DE USUARIOS
    if (params.password && params.name && params.surname) {
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.rol = 'ROLE_USER';
        user.IMAGE = null; 
        user.password = params.password;

        User.findOne({email: user.email.toLowerCase()}, (err, userDB) => {
            if (err) {
                res.status(500).send({ message: "Error al comprobar que el usuario exista"})
            } else {
                if (!userDB) {
                    // Cifrar la contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({ message: "Se ha produccido un error"})
                            } else {
                                if (!userStored) {
                                    res.status(404).send({ message: "No se ha registrado el usuario "})
                                } else {
                                    res.status(200).send({ user: userStored})
                                }
                            }
                        })
                    })
                } else {
                    res.status(200).send({
                        message: 'El usuario ya existe en la base de datos'
                    });
                }
            }
        })

    } else {
        res.status(200).send({
            message: 'Debe ingresar todos los datos'
        });
    }
}

module.exports = {
    pruebas,
    saveUser
};
