'use strict';
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var validateJwt = expressJwt({ secret: config.secrets.session });
var mysql = require('../db');
/**
* Attaches the user object to the request if authenticated
* Otherwise returns 403
*/
function isAuthenticated() {
    return compose()
    // Validate jwt
    .use(function(req, res, next) {
        // console.log('isAuth',req)
        // allow access_token to be passed through query parameter as well
        var token = req.cookies.bm_token || req.params.resid;
        console.log(token)
        if(token) {
            req.headers.authorization = 'Bearer ' + token;
            // console.log('header',req.headers.authorization)
        } else {
            // res.render('login', {errorMessage: 'You must login to view that page! [1]'});
            return res.status(403).send('UnauthorizedError: No authorization token was found');
        }
        try {
            validateJwt(req, res, next);
        } catch (e) {
            return res.status(403).send('UnauthorizedError: Authorization token was not found valid.');
        }
    })
    // Attach user to request
    .use(function(req, res, next) {
        var userObject = req.user || {};
        var uname = userObject.username || null;

        mysql.query(`SELECT * from users WHERE username = "${uname.toLowerCase()}" LIMIT 1`,
        function(err, users) {
            if (err) {
                return next(err);
            }
            if (!users) {
                return res.render('login', {
                    errorMessage: 'You must login and/or your session has expired.'
                });
            }
            req.user = users[0];
            next();
        });
    });
}

/**
* Returns a jwt token signed by the app secret
*/
function signToken(id, username) {
    return jwt.sign({
        id: id,
        username: username
    }, config.secrets.session, { expiresIn: 1000 * 60 * 60 * 5 });
}

/**
* Set token cookie directly for oAuth strategies
*/
function setTokenCookie(req, res) {
    if (!req.user) return res.json(404, { message: 'Something went wrong, please try again.'});
    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
