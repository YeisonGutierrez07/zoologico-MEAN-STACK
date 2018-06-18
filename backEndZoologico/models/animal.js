'use strict'

var mongoose = required('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    user: { type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Animal', AnimalSchema);