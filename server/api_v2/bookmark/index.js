'use strict';

var express = require('express');
var controller = require('./bookmark.controller');
var auth = require('../../auth/auth');
var util = require('../util.service');
var multer  = require('multer');
var upload = multer();

var router = express.Router();


router.use(util.renderModalMiddleware())
router.use(auth.isAuthenticated());

router.get('/', controller.list);
router.put('/:bid(\\d+)', controller.update);
router.post('/', controller.insert);// uid
router.delete('/:bid(\\d+)', controller.delete);
router.put('/star/:bid(\\d+)', controller.star);


// Exclusive routes for when js is turned off
// ------------------------------------------------------

router.post('/import', upload.single("file-import"), controller.import);

// Modal/Forms
router.get('/editForm/:bid(\\d+)', controller.updateForm);
router.get('/deleteForm/:bid(\\d+)', controller.deleteForm);
router.get('/addForm', controller.insertForm);// uid

// non-rest routes
router.get('/star/:bid(\\d+)', controller.star);
router.post('/edit/:bid(\\d+)', controller.update);
router.post('/delete/:bid(\\d+)', controller.delete);



module.exports = router;
