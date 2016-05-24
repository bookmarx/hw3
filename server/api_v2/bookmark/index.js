'use strict';

var express = require('express');
var controller = require('./bookmark.controller');
var auth = require('../../auth/auth');
var util = require('../util.service');

var router = express.Router();


router.use(util.renderModalMiddleware())
router.use(auth.isAuthenticated());

router.get('/', controller.list);
router.post('/edit/:bid(\\d+)', controller.update);
router.post('/', controller.insert);// uid
router.post('/delete/:bid(\\d+)', controller.delete);
router.get('/star/:bookmark_id', controller.star);


module.exports = router;
