/*  TODO: Add Function Blocks*/

var db = require('../../db');
var controller = {};

var Bookmark = require('./bookmark.model');
var Folder = require('../folder/folder.model');

var util = require('../util.service');

var logger = util.logger;

var getModals = util.getModals;
var filterOptions = util.filterOptions;
var where = util.where;


/**
*
* Selects all books and then renders the page with the list.ejs template
*/
controller.list = function(req, res) {
    var orderBy = req.query.orderBy || "";
    var keyword = req.query.keyword;
    var uid = req.user.id;

    var download = req.query.download;
    if(download === 'true'){
        res.attachment('export.json');
    }

    var options = filterOptions(orderBy);

    // Promise 1:
    var bookmarks = [];
    var bm1 = Bookmark.find(keyword, uid, options.filter.orderFilter);

    // Promise 2:
    var folders = {};
    var bm2 = Bookmark.getFoldersByUser(keyword, uid);

    // Wait for Promise 1 & Promise 2
    Promise.all([bm1, bm2]).then(function(val) {
        val[0].forEach(function(val, key){
            val.starCSS = util.starValToCss(val.star);
            bookmarks.push(val)
        })
        val[1].forEach(function(val, key){
            if(!folders[val.name]){ folders[val.name] = []; }
            val.starCSS = util.starValToCss(val.star);
            folders[val.name].push(val)
        })

        var resData =  {
            dd: options.dd,
            bm: bookmarks,
            folders : folders,
            loggedIn: true,
            modals: getModals()
        }

        // TODO:  res.render('index', resData);
        res.json(resData);
    }, function(reason) {
        logger.error('[ bookmark.controller.js - Promise.all() ]', reason);
        // TODO:  res.render()
        res.status(500).send(reason);
    }).catch(function(err){
        logger.error('[ bookmark.controller.js - Promise.all().catch() ]', err);
        // TODO: res.render()
        res.status(500).send(err);
    })
};


controller.insert = function(req, res){
    var user_id = req.user.id;
    var title = db.escape(req.body.title);
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var keywords = db.escape(req.body.keywords);
    var folder_id = db.escape(req.body.folders);

    if(req.body.title && req.body.title.length <= 0 ){
        return res.status(400).send({
            addModal: { errorMessage: 'Name cannot be blank!' }
        });
    }

    var queryString = 'INSERT INTO bookmarks (user_id, title, url, description, keywords, folder_id) VALUES ('+user_id+ ', ' + title + ', ' + url+ ', ' + description + ', ' + keywords + ', ' + folder_id +')';
    db.query(queryString, function(err){
        if(err){
            return res.status(500).send({
                addModal: { errorMessage: err }
            });
        }
        res.status(201).send('Created.');
    });
}


controller.update = function(req, res){
    var bid = req.params.bid;
    var title = db.escape(req.body.title);
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var keywords = db.escape(req.body.keywords);
    var folder_id = db.escape(req.body.folders);

    var queryString = 'UPDATE bookmarks SET title = ' + title +
    ', url = ' + url +
    ', description = ' + description+
    ', keywords = ' + keywords+
    ', folder_id = ' + folder_id +
    ' WHERE bookmark_id = ' + bid;
    db.queryP(queryString).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.status(500).send(err);
    });
};




/**
* Deletes the passed in book from the database.
* Does a redirect to the list page
*/
controller.delete = function(req, res) {
    var uid = db.escape(req.user.id);
    var bid = db.escape(req.params.bid);
    db.query(`DELETE from bookmarks where bookmark_id = ${bid} and user_id = ${uid}`, function(err){
        if (err){
            res.status(500).send();
        };
        res.status(204).send();
    });
};


/**
* Star a bookmark
* Redirect to the main page
*/

controller.star = function(req, res){
    var uid = db.escape(req.user.id);
    var bid  = db.escape(req.params.bid);
    console.log(`star | ${uid} | ${bid}`)
    var queryString = `UPDATE bookmarks SET star = !star WHERE bookmarks.bookmark_id = ${bid} and bookmarks.user_id = ${uid}`;

    db.queryP(queryString).then(function(data){
        res.json(data);
    }).catch(function(err){
        res.status(500).send(err);
    });
}

//===================================================
// Modals/Forms
//===================================================

controller.updateForm = function(req, res) {
    var uid = req.user.id;
    var bid = db.escape(req.params.bookmark_id);

    var folders = [{
        name: 'None',
        folder_id: -1
    }];

    var f1 = Folder.list({ uid: uid });
    var f1 = Bookmark.findOne({
        bid: bid,
        uid: uid
    });


    Promise.all(function(arr){
        arr[0].forEach(function(val, key){
            folders.push(val);
        });
    }).then(function(data){
        getModals({
            editModal : {
                bm: bookmarks[0],
                folders: folders
            }
        })
    })





};


module.exports = controller;
