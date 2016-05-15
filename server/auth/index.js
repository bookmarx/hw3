'use strict';

var express = require('express');
var config = require('../config/environment');
var mysql = require('../db');

// Passport Configuration

var router = express.Router();

router.use('/local', require('./local')(mysql, config));

module.exports = router;
