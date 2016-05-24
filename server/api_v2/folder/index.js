'use strict';

var express = require('express');
var controller = require('./folder.controller');
var auth = require('../../auth/auth');
var util = require('../util.service');

var router = express.Router();

router.use(util.renderModalMiddleware())
router.use(auth.isAuthenticated());

// router.get('/', controller.list);
// router.post('/edit/:bid(\\d+)', controller.update);
// router.post('/add/', controller.insert);// uid
// router.post('/delete/:bid(\\d+)', controller.delete);
// router.get('/star/:bookmark_id', controller.star);

router.get('/', controller.list);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
