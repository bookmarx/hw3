'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.list);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

// app.get('/', users.loginForm);
// app.get('/login', users.loginForm);
// app.post('/login', users.login);
// app.get('/logout', users.logout);

module.exports = router;
