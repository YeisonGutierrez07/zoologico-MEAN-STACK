'use strict'

function pruebas (req, res) {
    res.status(200).send({
        message: 'Probando el controlador de pruebas'
    });
}

module.exports = {
    pruebas
};
