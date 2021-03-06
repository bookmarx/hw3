
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var config = require('./environment');
var mySession = session({
  secret: 'N0deJS1sAw3some',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});

module.exports = function(app) {
    app.use(mySession);

    /*  Not overwriting default views directory of 'views' */
    app.set('view engine', 'ejs');
    app.set('views', config.root + '/client-webpack/views');
    app.use(compression());
    app.use(express.static('client'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
}
