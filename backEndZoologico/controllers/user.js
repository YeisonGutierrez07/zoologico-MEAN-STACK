'use strict'
// Modulos
var bcrypt = require('bcrypt-nodejs');

// modulos
var User = require('../models/user');

// Servicios
var jwt = require('../services/jwt');

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

function loggin(req, res) {
    
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, userDB) => {
        if (err) {
            res.status(500).send({ message: "Error al comprobar que el usuario exista"})
        } else {
            if (userDB) {
                bcrypt.compare(password, userDB.password, (err, check) => {
                    if (check) {
                        //Comprobar y generar token
                        if (params.getToken) {
                            //devolver token 
                            res.status(200).send({
                                token: jwt.createToken(userDB)
                            })

                        } else {
                            res.status(200).send({userDB})
                        }
                    } else {
                        res.status(200).send({
                            message: "El usuario no ha podido loggearse correctamente"
                        })
                    }
                });
            } else {
                res.status(200).send({
                    message: "El usuario no existe"
                })
            }
        }
    })


    
}

module.exports = {
    pruebas,
    saveUser,
    loggin
};
