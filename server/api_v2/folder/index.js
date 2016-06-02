'use strict';

var express = require('express');
var controller = require('./folder.controller');
var auth = require('../../auth/auth');
var util = require('../util.service');

var router = express.Router();

router.use(util.renderModalMiddleware());
router.use(auth.isAuthenticated());

router.get('/addForm', controller.addFolderForm);

router.get('/', controller.list);
router.get('/:id', controller.show);
router.post('/', controller.insert);

//router.put('/:id', controller.update);
//router.delete('/:id', controller.delete);




module.exports = router;
