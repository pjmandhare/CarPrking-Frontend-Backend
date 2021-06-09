'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/register', controller.create);

router.post('/login', controller.login);

router.get('/users',auth.isAdmin(), controller.users);



module.exports = router;
