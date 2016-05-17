
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser')
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
    app.set('views', app.locals.SERVER_ROOT + '/views')
    app.use(express.static('client'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
}
