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

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/change', auth.isAuthenticated(), controller.changePassword);

// Send Forgot Email
router.get('/reset/:resid', auth.isAuthenticated(), controller.resetForm);
router.get('/forgot', controller.forgotForm);

router.post('/reset', auth.isAuthenticated(), controller.reset);
router.post('/forgot', controller.forgot);


module.exports = router;
