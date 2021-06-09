'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');


var mongooseTypes = require("mongoose-types"); //for valid email and url

var slotsSchema = new Schema({
    userId:{
        lowercase:true,
        type:String,
        
    },
    slotName:{
        type: String,
        required: true
    },
    time:{
        type: String,
        default: null
    },
    vaccant:{
        type: String,
        default: true
    },
    createdt:{
        type:Date,
        default: Date.now
    },
   
   
});

module.exports = mongoose.model('slots', slotsSchema);