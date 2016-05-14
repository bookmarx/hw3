var config = require('./config');
// var db = require('./db');
// var books = require('./books');
// var users = require('./users');

// db.init();
var bm = require('./bookmark');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mySession = session({
  secret: 'N0deJS1sAw3some',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});

var app = express();

// var routes = require('./routes')(app);

app.use(mySession);

/*  Not overwriting default views directory of 'views' */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes - consider putting in routes.js */
app.use('/v1/bookmark', require('./api_v1/bookmark'));
app.use('/v1/user', require('./api_v1/user'));

app.listen(config.PORT, function () {
  console.log('Example app listening on port ' + config.PORT + '!');
});
