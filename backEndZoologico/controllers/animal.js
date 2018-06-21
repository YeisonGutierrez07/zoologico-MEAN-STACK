'use strict';

// modulos
var Animal = require('../models/animal');
var fs = require('fs');
var pathFile = require('path');

// Servicios
var jwt = require('../services/jwt');

function pruebas (req, res) {
    res.status(200).send({
        message: 'Probando el controlador de pruebas'
    });
}

function saveAnimal(req, res) {
    var animal = new Animal();
    var params = req.body;
    console.log(params);
    console.log(req);
    if (params.name) {
        animal.name = params.name;
        animal.description = params.description;
        animal.year =  params.year;
        animal.image = null;
        animal.user = req.user.sub;
        

        animal.save((err, animalStored) => {
            if(err) {
                res.status(500).send({message: 'SE HA PRODUCIDO UN ERROR'});
            } else {
                if (animalStored) {
                    res.status(200).send({animalStored});
                } else {
                    res.status(404).send({message: 'NO SE HA GUARDADO EL ANIMAL'});
                }
            }
        })
    } else {
        res.status(200).send({message: 'EL NOMBRE ES OBLIGATORIO'});
    }
}

function getAllAnimals(req, res) {
    console.log("OK");
    Animal.find({}).populate({path: 'user'}).exec((err, animals) => {
        if (err) {
            res.status(500).send({message:"ERROR DE SERVIDOR"})
        } else {
            if (animals) {
                res.status(200).send({animals})
            } else {
                res.status(404).send({message:"NO HAY CUIDADORES"})
            }
        }
    })
}

function getAnimalById (req, res) {
    var idAnimal = req.params.idAnimal;
    console.log(idAnimal);
    Animal.findById(idAnimal).populate({path: 'user'}).exec((err, animal) => {
        if (err) {
            res.status(500).send({message: 'ERROR EN EL SERVIDOR'})
        } else {
            if (animal) {
                res.status(200).send(animal)
            } else {
                res.status(404).send({message: 'Error al consultar los datos'})
            }
        }
    })
}

function updateAnimal (req, res) {
    var animalId = req.params.idAnimal;
    var update = req.body;
    Animal.findByIdAndUpdate(animalId, update, { new: true}, (err, update) =>  {
        if (err) {
            res.status(500).send({message: 'ERROR EN EL SERVIDOR'})
        } else {
            if (update) {
                res.status(200).send(update)
            } else {
                res.status(404).send({message: 'Error al consultar los datos'})
            }
        }
    })
}

function uploadImageAnimal (req, res) {
    var animalId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext === 'png' || file_ext === 'jpg' || file_ext === 'jpeg' || file_ext === 'gif') {

            Animal.findByIdAndUpdate(animalId, {image: file_name}, { new: true}, (err, animalUpdate) => {
                if (err) {
                    res.status(500).send({ message: 'NO SE PUDIERON ACTUALIZAR LOS DATOS'});
                } else {
                    if (!animalUpdate) {
                        res.status(404).send({ message: "NO SE ACTUALIZARON LOS DATOS"});
                    } else {
                        res.status(200).send({
                            message: "LOS DATOS SE ACTUALIZARON CORRECTAMENTE",
                            user: animalUpdate,
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
    console.log("QQQQQ", req.params)
    var imageFile = req.params.imageFile;
    var path_file = './uploads/animals/' + imageFile;

    console.log(path_file);
    fs.exists(path_file, (exist) => {
        if (exist) {
            res.sendFile(pathFile.resolve(path_file));
        } else {
            res.status(404).send({ message: "LA IMAGEN NO EXISTEXXX"})
        }
    })
}

module.exports = {
    pruebas,
    saveAnimal,
    getAllAnimals,
    getAnimalById,
    updateAnimal,
    uploadImageAnimal,
    getImageFile
}