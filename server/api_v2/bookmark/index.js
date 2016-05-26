'use strict';

var express = require('express');
var controller = require('./bookmark.controller');
var auth = require('../../auth/auth');
var util = require('../util.service');

var router = express.Router();


router.use(util.renderModalMiddleware())
router.use(auth.isAuthenticated());

router.get('/', controller.list);
router.put('/:bid(\\d+)', controller.update);
router.post('/', controller.insert);// uid
router.delete('/:bid(\\d+)', controller.delete);
router.put('/star/:bid(\\d+)', controller.star);


module.exports = router;
