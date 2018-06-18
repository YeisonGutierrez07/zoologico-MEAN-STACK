'use strict'

var mongoose = required('mongoose');
var Schema = mongoose.Schema;

var UserSchema = schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('User', UserSchema);