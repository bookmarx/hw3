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
app.get('/', bm.list);

app.get('/bm/add', bm.add);
app.get('/bm/edit/:book_id(\\d+)', bm.edit);
app.get('/bm/confirmdelete/:book_id(\\d+)', bm.confirmdelete);
app.get('/bm/delete/:book_id(\\d+)', bm.delete);
app.post('/bm/update/:book_id(\\d+)', bm.update);
app.post('/bm/insert', bm.insert);


// app.get('/', users.loginForm);
// app.get('/login', users.loginForm);
// app.post('/login', users.login);
// app.get('/logout', users.logout);
//
// /*  This must go between the users routes and the books routes */


// app.get('/books', books.list);
// app.get('/books/add', books.add);
// app.get('/books/edit/:book_id(\\d+)', books.edit);
// app.get('/books/confirmdelete/:book_id(\\d+)', books.confirmdelete);
// app.get('/books/delete/:book_id(\\d+)', books.delete);
// app.post('/books/update/:book_id(\\d+)', books.update);
// app.post('/books/insert', books.insert);

app.listen(config.PORT, function () {
  console.log('Example app listening on port ' + config.PORT + '!');
});
