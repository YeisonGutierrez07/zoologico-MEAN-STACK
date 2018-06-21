'use strict'
// Modulos
var bcrypt = require('bcrypt-nodejs');

// modulos
var User = require('../models/user');
var fs = require('fs');
var pathFile = require('path');

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
    console.log(password);
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

function updateUser (req, res) {
    var userId = req.params.id;
    var update = req.body;

    console.log(update);

    if (userId != req.user.sub) {
        res.status(500).send({ message: 'No tienes permisos'});
    }
    User.findByIdAndUpdate(userId, update, { new: true}, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'NO SE PUDIERON ACTUALIZAR LOS DATOS'});
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: "NO SE ACTUALIZARON LOS DATOS"});
            } else {
                res.status(200).send({
                    message: "LOS DATOS SE ACTUALIZARON CORRECTAMENTE",
                    user: userUpdate
                })
            }
        }
    });
}

function uploadImage (req, res) {
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg' || file_ext === 'gif') {
            if (userId != req.user.sub) {
                res.status(500).send({ message: 'No tienes permisos'});
            }
            User.findByIdAndUpdate(userId, {image: file_name}, { new: true}, (err, userUpdate) => {
                if (err) {
                    res.status(500).send({ message: 'NO SE PUDIERON ACTUALIZAR LOS DATOS'});
                } else {
                    if (!userUpdate) {
                        res.status(404).send({ message: "NO SE ACTUALIZARON LOS DATOS"});
                    } else {
                        res.status(200).send({
                            message: "LOS DATOS SE ACTUALIZARON CORRECTAMENTE",
                            user: userUpdate,
                            image: file_name
                        })
                    }
                }
            });
        } else {
            fs.unlink(file_path, (err) => {
                if(err) {
                    res.status(200).send({ message: "LA EXTENCION NO ES VALIDA Y FICHERO NO BORRADO"});
                } else {
                    res.status(200).send({ message: "LA EXTENCION NO ES VALIDA"});
                }
            })
        }
    } else {
        res.status(200).send({ message: "NO SE HAN SUBIDO ARCIVOS"});
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

    fs.exists(path_file, (exist) => {
        if (exist) {
            res.sendFile(pathFile.resolve(path_file));
        } else {
            res.status(404).send({ message: "LA IMAGEN NO EXISTE"})
        }
    })

}

function getKeepers(req, res) {
    User.find({rol: 'ROLE_ADMIN'}).exec((err, users) => {
        if (err) {
            res.status(500).send({message:"ERROR DE SERVIDOR"})
        } else {
            if (users) {
                res.status(200).send({users})
            } else {
                res.status(404).send({message:"NO HAY CUIDADORES"})
            }
        }
    })
}

module.exports = {
    pruebas,
    saveUser,
    loggin,
    updateUser,
    uploadImage,
    getImageFile,
    getKeepers
};
