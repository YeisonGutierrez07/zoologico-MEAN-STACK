'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'claveSecreta';

exports.ensreAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: "LA peticion no tiene la autorizacion"})
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);
        if (payload.sub && (payload.exp <= moment().unix())) {
            return res.status(401).send({
                message: "El token ha espirado"
            })
        }
    } catch (ex) {
        return res.status(401).send({
            message: "El token no es valido"
        })
    }

    req.user = payload;
    next();
}


