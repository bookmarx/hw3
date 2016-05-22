'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth');
var util = require('../util.service');

var router = express.Router();



router.use(util.renderModalMiddleware())

router.get('/', controller.loginForm);
router.get('/signup', controller.signupForm);
router.get('/logout', controller.logout);
router.get('/change', auth.isAuthenticated(), controller.changePasswordForm);

// router.get('/:id', controller.show);
router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/change', auth.isAuthenticated(), controller.changePassword);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

// app.get('/', users.loginForm);
// app.get('/login', users.loginForm);
// app.post('/login', users.login);
// app.get('/logout', users.logout);

module.exports = router;
