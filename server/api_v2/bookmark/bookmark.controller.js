/*  TODO: Add Function Blocks*/
'use strict';
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
    var jsOn = (req.headers['x-js-on'] === 'true') ? true : false;
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

    // Winston Logging
    logger.info('[ bookmark.controller.js - list() ] user: ' + uid);

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
        };

        if(jsOn){
            res.json(resData);
        } else {
            res.render('index', resData);
        }

    }, function(reason) {
        logger.error('[ bookmark.controller.js - Promise.all() ]', reason);
        res.status(500).send(reason);
    }).catch(function(err){
        logger.error('[ bookmark.controller.js - Promise.all().catch() ]', err);
        // TODO: res.render()
        res.status(500).send(err);
    })
};


controller.insert = function(req, res){
    var jsOn = (req.headers['x-js-on']) ? true : false;

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

    // Winston Logging
    logger.info('[ bookmark.controller.js - insert() ] user: ' + uid);

    var queryString = 'INSERT INTO bookmarks (user_id, title, url, description, keywords, folder_id) VALUES ('+user_id+ ', ' + title + ', ' + url+ ', ' + description + ', ' + keywords + ', ' + folder_id +')';
    db.query(queryString, function(err){
        if(err){

            // Javascript On/Off
            if(jsOn){
                res.status(500).send({
                    addModal: { errorMessage: err }
                });
            } else {
                res.renderModal({
                    addModal: { errorMessage: err }
                });
            }
            return null;
        }

        // Javascript On/Off
        if(jsOn){
            res.status(201).send('Created');
        } else {
            res.redirect('/v1/bm/');
        }
    });
}


controller.update = function(req, res){
    var jsOn = (req.headers['x-js-on']) ? true : false;

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

    // Winston Logging
    logger.info('[ bookmark.controller.js - update() ] user: ' + uid);

    db.queryP(queryString).then(function(data){
        logger.info(`[ bookmark.controller.js - update() - queryP() ] ${data}`);
        if(jsOn){
            res.json(data);
        } else {
            res.redirect('/v2/bm/');
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
};




/**
 * Deletes the passed in book from the database.
 * Does a redirect to the list page
 */
controller.delete = function(req, res) {
    var jsOn = (req.headers['x-js-on']) ? true : false;
    var uid = db.escape(req.user.id);
    var bid = db.escape(req.params.bid);

    logger.info(`[ bookmark.controller.js - delete() ] uid: ${uid} bid: ${uid}`)

    db.query(`DELETE from bookmarks where bookmark_id = ${bid} and user_id = ${uid}`, function(err){
        if (err){
            res.status(500).send();
        };
        if(jsOn){
            res.status(204).send();
        } else {
            res.redirect('/v2/bm/');
        }
    });
};


/**
 * Star a bookmark
 * Redirect to the main page
 */

controller.star = function(req, res){
    logger.info('[ bookmark.controller.js - star() ]');

    var jsOn = (req.headers['x-js-on']) ? true : false;

    var uid = db.escape(req.user.id);
    var bid  = db.escape(req.params.bid);
    console.log(`star | ${uid} | ${bid}`)
    var queryString = `UPDATE bookmarks SET star = !star WHERE bookmarks.bookmark_id = ${bid} and bookmarks.user_id = ${uid}`;


    // Winston Logging
    logger.info('[ bookmark.controller.js - star() ] user: ' + uid);

    db.queryP(queryString).then(function(data){
        if(jsOn){
            res.json(data);
        } else {
            logger.info('[ bookmark.controller.js - star() ] res.redirect(/v2/bm/')
            res.redirect('/v2/bm/');
        }
    }).catch(function(err){
        res.status(500).send(err);
    });
}

//===================================================
// Modals/Forms
//===================================================

// Update Form Modal
controller.updateForm = function(req, res) {

    var jsOn = (req.headers['x-js-on']) ? true : false;

    var uid = req.user.id;
    var bid = db.escape(req.params.bid);

    var folders = [{
        name: 'None',
        folder_id: -1
    }];

    var f1 = Folder.list({ uid: uid });
    var f2 = Bookmark.findOne({
        bid: bid,
        uid: uid
    });

    // Winston Logging
    logger.info('[ bookmark.controller.js - updateForm() ] user: ' + uid);

    Promise.all([f1, f2]).then(function(arr){
        logger.info('[ bookmark.controller.js - updateForm().all() ]', arr);

        arr[0].forEach(function(val, key){
            folders.push(val);
        });

        res.renderModal({
            editModal: {
                bm: arr[1][0],
                folders: folders
            }
        });
    }, function(err){
        logger.info('[ bookmark.controller.js - updateForm().all() ]', err);

        res.status(500).send(err);
    }).catch(function(err){
        logger.info('[ bookmark.controller.js - updateForm().catch() ]', err)
        res.status(500).send(err);
    });
};

// Delete Form Modal
controller.deleteForm = function(req, res) {
    logger.info('[ bookmark.controller.js - deleteForm()]')

    var bid = req.params.bid;
    db.query('SELECT * from bookmarks WHERE bookmark_id =  ' + bid, function(err, bookmarks) {
        if (err) return res.status(500).send(err);
        res.renderModal({
            deleteModal : bookmarks[0]
        });
    });
};


/**
 *
 * Renders the add page with the add.ejs template
 */
controller.insertForm = function(req, res) {
    var uid = req.user.id;
    var queryString = `SELECT *
    FROM folders
    WHERE folders.user_id = ${uid}`;
    var folders = [{
        name: 'None',
        folder_id: -1
    }];

    // Winston Logging
    logger.info('[ bookmark.controller.js - insertForm() ] user: ' + uid);

    util.queryP(queryString)
        .then(function(data){
            data.forEach(function(val, key){
                folders.push(val);
            });

            res.renderModal({
                addModal : {
                    folders: folders
                }
            });
        })
        .catch(function(err){
            res.redirect('/v2/bm/')
        });
};

controller.import = function(req, res) {
    var uid = db.escape(req.user.id);

    // Winston Logging
    logger.info('[ bookmark.controller.js - insertForm() ] user: ' + uid);

    util.queryP(`DELETE from bookmarks where user_id = ${uid}`)
    .then(function(){
        var fdata = JSON.parse(req.file.buffer);
        console.log('file', fdata.bm);
        var pArr = [];
        fdata.bm.forEach(function(val, idx) {
            var title = db.escape(val.title);
            var url = db.escape(val.url);
            var description = db.escape(val.description);
            var keywords = db.escape(val.keywords);
            var folder_id = '-1';

            console.log('title', title);

            var queryString = 'INSERT INTO bookmarks (user_id, title, url, description, keywords, folder_id) VALUES ('+uid+ ', ' + title + ', ' + url+ ', ' + description + ', ' + keywords + ', ' + folder_id +')';
            pArr.push(util.queryP(queryString));
        });

        Promise.all(pArr)
        .then(function(data){
            console.log('Complete Insert!', data);
            res.send();
        })
        .catch(function(err){
            console.log('Error Insert: ', err);
            res.status(500).send(err);
        })
    })
    .catch(function(err){
        console.log('Error Insert: ', err);
        res.status(500).send(err);
    });
};

module.exports = controller;
