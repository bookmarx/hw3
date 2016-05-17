/*  TODO: Add Function Blocks*/

var db = require('../../db');
var controller = {};

function getModals(opts){
    var opts = opts || {};
    return {
        addModal: opts.addModal || 0,
        editModal: opts.editModal || 0,
        deleteModal: opts.deleteModal || 0,
        addFolderModal: opts.addFolderModal || 0
    };
}

/**
*
* Selects all books and then renders the page with the list.ejs template
*/
controller.list = function(req, res) {
    db.query('SELECT * from bookmarks ORDER BY bookmark_id', function(err, bm) {
        var renderBM = [];
        if (err) throw err;

        res.render('index', {
            bm: bm,
            loggedIn: true,
            modals: getModals()
        });
    });
};



/**
*
* Renders the add page with the add.ejs template
*/
controller.insertForm = function(req, res) {
    var uid = req.params.uid;
    var m =  getModals({
        addModal : uid
    })
    console.log('uid', m)
    res.render('index', {
        loggedIn: true,
        bm :[],
        modals : m
    });

};
controller.insert = function(req, res){
    var user_id = req.params.uid;
    var title = db.escape(req.body.title);
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var keywords = db.escape(req.body.keywords);
    var queryString = 'INSERT INTO bookmarks (user_id, title, url, description, keywords) VALUES ('+user_id+ ', ' + title + ', ' + url+ ', ' + description + ', ' + keywords +')';
        db.query(queryString, function(err){
            res.redirect('/v1/bm/');
        });
}






/**
*
* Selects information about the passed in bood and then
* renders the edit confirmation page with the edit.ejs template
*/
controller.updateForm = function(req, res) {
    var bid = req.params.bid;
    db.query('SELECT * from bookmarks WHERE bookmark_id =  ' + bid, function(err, bookmarks) {
        if (err) throw err;

        res.render('index', {
            loggedIn: true,
            bm :[],
            modals : getModals({
                editModal : bookmarks[0]
            })
        });
    });
};
controller.update = function(req, res){
    var bid = req.params.bid;
    var title = db.escape(req.body.title);
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var keywords = db.escape(req.body.keywords);

    // if(url.substring(0,6) != "http://"){
    //     url = "http://" + url;
    // }

    var queryString = 'UPDATE bookmarks SET title = ' + title + ', url = ' + url + ', description = ' + description+ ', keywords = ' + keywords + ' WHERE bookmark_id = ' + bid;
    db.query(queryString, function(err){
        if (err) throw err;
        res.redirect('/v1/bm/');
    });
};





controller.deleteForm = function(req, res) {
    var bid = req.params.bid;
    db.query('SELECT * from bookmarks WHERE bookmark_id =  ' + bid, function(err, bookmarks) {
        if (err) throw err;

        res.render('index', {
            loggedIn: true,
            bm :[],
            modals : getModals({
                deleteModal : bookmarks[0]
            })
        });
    });
};

/**
* Deletes the passed in book from the database.
* Does a redirect to the list page
*/
controller.delete = function(req, res) {
    var bid = req.params.bid;
    db.query('DELETE from bookmarks where bookmark_id = ' + bid, function(err){
        if (err) throw err;
        res.redirect('/v1/bm/');
    });
};



module.exports = controller;
