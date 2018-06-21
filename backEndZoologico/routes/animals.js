'use strict'

var express = require('express');
var AnimalsController = require('../controllers/animal');

var api = express.Router();
var dmAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/animals'})

// GET
api.get('/pruebas-animals', dmAuth.ensreAuth, AnimalsController.pruebas);
api.get('/getAllAnimals', dmAuth.ensreAuth, AnimalsController.getAllAnimals);
api.get('/getAnimalById/:idAnimal', dmAuth.ensreAuth, AnimalsController.getAnimalById);
api.get('/getImageFileAnimal/:imageFile', dmAuth.ensreAuth, AnimalsController.getImageFile);

//POST
api.post('/saveAnimal', dmAuth.ensreAuth, AnimalsController.saveAnimal);
api.post('/uploadImageAnimal/:id', [dmAuth.ensreAuth, mdUpload], AnimalsController.uploadImageAnimal);

//PUT

api.put('/updateAnimal/:idAnimal', dmAuth.ensreAuth, AnimalsController.updateAnimal);

module.exports = api;