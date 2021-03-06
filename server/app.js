var express = require('express');
var http = require('http');

var logger = require('./logger');
var mysql = require('./db');
var config = require('./config/environment');

console.log('Config Settings:');
console.log(JSON.stringify(config, null, 2));

mysql.init(config.mysql);

var app = express();

app.locals.SERVER_ROOT = __dirname;

require('./config/express')(app)

/* Routes - consider putting in routes.js */
app.use('/auth', require('./auth'));

app.use('/', require('./api_v2/user'));

// app.use('/v1/bm', require('./api_v1/bookmark'));
app.use('/v2/bm', require('./api_v2/bookmark'));
app.use('/v2/folder', require('./api_v2/folder'));

app.get('*', function(req, res) {
    res.redirect('/app/');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.render('login', {errorMessage: 'Your session has expired!'});
});

// Using http instead of app.listen because of possible deprecation
http.createServer(app).listen(config.port, function () {
    logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// var mailer = require('./api_v2/user/mailer.service');
// mailer.sendResetEmail('alexhgian@gmail.com');

exports = module.exports = app;
