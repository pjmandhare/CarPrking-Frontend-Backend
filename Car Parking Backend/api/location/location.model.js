'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');


var mongooseTypes = require("mongoose-types"); //for valid email and url

var LocationSchema = new Schema({
    userId:{
        lowercase:true,
        type:String,
        required: true
    },
    latitude:{
        type: String,
        required: true
    },
    longitude:{
        type: String,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    validTime:{
        type: Boolean,
        default: true
    },
    createdt:{
        type:Date,
        default: Date.now
    },
   
   
});

module.exports = mongoose.model('Location', LocationSchema);