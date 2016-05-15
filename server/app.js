var express = require('express');
var http = require('http');

var mysql = require('./db');
var config = require('./config/environment');

mysql.init(config.mysql);

var app = express();

app.locals.SERVER_ROOT = __dirname;

require('./config/express')(app)



/* Routes - consider putting in routes.js */
app.use('/', require('./api_v1/bookmark'));
app.use('/v1/user', require('./api_v1/user'));
app.use('/auth', require('./auth'));

// Using http instead of app.listen because of possible deprecation
http.createServer(app).listen(config.PORT, function () {
    console.log('App listening on ' + config.PORT + '!');
});

module.exports = app;
