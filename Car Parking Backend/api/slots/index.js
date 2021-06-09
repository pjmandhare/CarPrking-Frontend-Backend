'use strict';

var express = require('express');
var controller = require('./slots.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/get-slots', controller.slots);

router.get('/create', controller.create);





module.exports = router;
