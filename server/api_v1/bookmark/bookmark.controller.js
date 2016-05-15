/*  TODO: Add Function Blocks*/

var db = require('../../db');
var controller = {};

/**
*
* Selects all books and then renders the page with the list.ejs template
*/
controller.list = function(req, res) {
    db.query('SELECT * from bookmarks ORDER BY id', function(err, bm) {
        var renderBM = [];
        if (err) throw err;

        res.render('index', { bm: bm, loggedIn: true});
    });
};

/**
*
* Selects information about passed in book and then
* renders the delete confirmation page with the delete.ejs template
*/
controller.confirmdelete = function(req, res){
    var id = req.params.book_id;
    db.query('SELECT * from books WHERE id =  ' + id, function(err, book) {
        if (err) throw err;
        res.render('books/delete', {book: book[0]});
    });
};

/**
*
* Renders the add page with the add.ejs template
*/
controller.add = function(req, res) {
    res.render('books/add');
};

/**
*
* Selects information about the passed in bood and then
* renders the edit confirmation page with the edit.ejs template
*/
controller.edit = function(req, res) {
    var id = req.params.book_id;
    db.query('SELECT * from books WHERE id =  ' + id, function(err, book) {
        if (err) throw err;

        res.render('books/edit', {book: book[0]});
    });
};

/**
* Deletes the passed in book from the database.
* Does a redirect to the list page
*/
controller.delete = function(req, res) {
    var id = req.params.book_id;
    db.query('DELETE from books where id = ' + id, function(err){
        if (err) throw err;
        res.redirect('/books');
    });
};

/**
* Adds a new book to the database
* Does a redirect to the list page
*/
controller.insert = function(req, res){
    var title = db.escape(req.body.title);
    var author = db.escape(req.body.author);
    var price = db.escape(req.body.price);

    var queryString = 'INSERT INTO books (title, author, price) VALUES (' + title + ', ' + author + ', ' + price + ')';
    db.query(queryString, function(err){
        res.redirect('/books');
    });
};

/**
* Updates a book in the database
* Does a redirect to the list page
*/
controller.update = function(req, res){
    var id = req.params.book_id;
    var title = db.escape(req.body.title);
    var author = db.escape(req.body.author);
    var price = db.escape(req.body.price);

    var queryString = 'UPDATE books SET title = ' + title + ', author = ' + author + ', price = ' + price + ' WHERE id = ' + id;
    db.query(queryString, function(err){
        if (err) throw err;
        res.redirect('/books');
    });
};

module.exports = controller;
