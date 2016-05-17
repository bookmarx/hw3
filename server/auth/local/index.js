'use strict';
var logger = require('../../logger')
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('../auth');

var router = express.Router();

router.post('/', function(req, res, next) {
  console.log('req', req)
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) return res.status(401).json(error);
    if (!user) return res.status(404).json({message: 'Something went wrong, please try again. ' + info.message });

    var token = auth.signToken(user._id, user.role);
    res.json({token: token});
  })(req, res, next)
});


module.exports = function(mysql, config){
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
        logger.info('LocalStrategy', email, '|', password)
        mysql.query(`SELECT * from users WHERE username = "${email.toLowerCase()}" LIMIT 1`, function(err, users) {
            logger.info(users)
            if (err) { return done(err) }
            if (!users) {
                logger.info('!users', users)
                return done(null, false, { message: 'This email is not registered.' });
            }
            // if (!users[0].authenticate(password)) {
            //     return done(null, false, { message: 'This password is not correct.' });
            // }
            return done(null, users[0]);
        });
    }));
    return router;
};
