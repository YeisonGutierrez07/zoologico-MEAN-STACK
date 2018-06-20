'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var dmAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/users'})

// GET
api.get('/pruebas-del-controlador', dmAuth.ensreAuth, UserController.pruebas);
api.get('/getImageFile/:imageFile', dmAuth.ensreAuth, UserController.getImageFile);
api.get('/getKeepers', UserController.getKeepers)


//POST
api.post('/register', UserController.saveUser);
api.post('/loggin', UserController.loggin);
api.post('/uploadImage/:id', [dmAuth.ensreAuth, mdUpload], UserController.uploadImage);

//PUT
api.put('/updateUser/:id', dmAuth.ensreAuth, UserController.updateUser);



module.exports = api;