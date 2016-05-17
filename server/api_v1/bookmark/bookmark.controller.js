/*  TODO: Add Function Blocks*/

var db = require('../../db');
var controller = {};

var util = require('../util.service');

var getModals = util.getModals;
var filterOptions = util.filterOptions;
var where = util.where;


/**
*
* Selects all books and then renders the page with the list.ejs template
*/
controller.list = function(req, res) {
    var dd = filterOptions();
    var orderBy = req.query.orderBy || "";
    var keyword = req.query.keyword;
    var uid = req.user.id;

    console.log('orderBy', orderBy);
    var query = "";

    if(orderBy === "MostRecent"){
        query = "bookmark_id DESC";
        dd[0].selected = 'selected';
    } else if(orderBy === "Favorites"){
        query = "star ASC";
        dd[1].selected = 'selected';
    } else if(orderBy === "Alphabetical"){
        query = "title ASC";
        dd[2].selected = 'selected';
    } else if(orderBy === "Date"){
        query = "dateAdded ASC";
        dd[3].selected = 'selected';
    }  else{
        query = "title ASC";
        dd[0].selected = 'selected';
    }
    var queryString = `SELECT * FROM bookmarks ${where(keyword, uid)} ORDER BY ${query}`;
    console.log('queryString', queryString)
    db.query(queryString, function(err, bm) {
        var renderBM = [];
        if (err) throw err;

        bm.forEach(function(val, key){
            if(val.star){
                val.starCSS = "fa-star";
            }else{
                val.starCSS = "fa-star-o";
            }
        })
        res.render('index', {
            dd: dd,
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
    var m =  getModals({
        addModal : 1
    })
    console.log('uid', m)
    res.render('index', {
        dd: filterOptions(),
        loggedIn: true,
        bm :[],
        modals : m
    });

};
controller.insert = function(req, res){
    var user_id = req.user.id;
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
    var queryString = `SELECT * from bookmarks WHERE bookmark_id =  ${bid}`;
    db.query(queryString, function(err, bookmarks) {
        if (err) throw err;

        res.render('index', {
            dd: filterOptions(),
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
            dd: filterOptions(),
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

controller.addFolderForm = function(req, res){
    var uid = 1;
    res.render('index', {
        dd: filterOptions(),
        loggedIn: true,
        bm :[],
        modals : getModals({
            addFolderModal : uid
        })
    });
};
/**
* add a folder to db
*/
controller.addFolder = function(req, res){
    var name = db.escape(req.body.name);
    var descrip = db.escape(req.body.description);
    var keyword = db.escape(req.body.keyword);

    var queryString = 'INSERT INTO folders (name, description, keyword) VALUES (' + name +', ' + descrip + ', ' + keyword + ')';
    db.query(queryString , function(err){
        if(err) throw err;
        res.redirect('/v1/bm/');
    });
};

/**
* Star a bookmark
* Redirect to the main page
*/

controller.star = function(req, res){
    var id  = req.params.bookmark_id;
    db.query('UPDATE bookmarks SET star = !star WHERE bookmark_id = ' + id, function(err){
      if(err) throw err;
      res.redirect('/v1/bm/');
    })
}



module.exports = controller;
