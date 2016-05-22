/*  TODO: Add Function Blocks*/

var db = require('../../db');
var controller = {};

var Bookmark = require('./bookmark.model');

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

    var options = filterOptions(orderBy);

    // Promise 1:
    var bookmarks = [];
    var bm1 = Bookmark.find(keyword, uid, options.filter)
    .then(function(bms){
            bms.forEach(function(val, key){
                val.starCSS = util.starValToCss(val.star);
                bookmarks.push(val)
            })
    })

    // Promise 2:
    var folders = {};
    var bm2 = Bookmark.getFoldersByUser(keyword, uid)
    .then(function(folds){
        folds.forEach(function(val, key){
            if(!folders[val.name]){ folders[val.name] = []; }
            val.starCSS = util.starValToCss(val.star);
            folders[val.name].push(val)
        })
    })

    // Wait for Promise 1 & Promise 2
    Promise.all([bm1, bm2]).then(function(values) {
        var resData =  {
            dd: options.dd,
            bm: renderBM,
            folders : foldersObj,
            loggedIn: true,
            modals: getModals()
        }

        // res.render('index', resData);
        res.json(resData);
    }, function(reason) {
        console.log('rejected', reason);
        // res.render()
        res.status(500).send(reason);
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
    util.queryP(queryString)
    .then(function(data){
        data.forEach(function(val, key){
            folders.push(val);
        });

        var m =  getModals({
            addModal : {
                folders: folders
            }
        })
        console.log('getModals', JSON.stringify(m))

        res.render('index', {
            folders: {},
            dd: filterOptions(),
            loggedIn: true,
            bm :[],
            modals : m
        });
    })
    .catch(function(err){

    });




};
controller.insert = function(req, res){
    var user_id = req.user.id;
    var title = db.escape(req.body.title);
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var keywords = db.escape(req.body.keywords);
    var folder_id = db.escape(req.body.folders);

    if(req.body.title.length <= 0 ){
        return res.renderModal({
            addModal: { errorMessage: 'Name cannot be blank!' }
        });
    }

    var queryString = 'INSERT INTO bookmarks (user_id, title, url, description, keywords, folder_id) VALUES ('+user_id+ ', ' + title + ', ' + url+ ', ' + description + ', ' + keywords + ', ' + folder_id +')';
    db.query(queryString, function(err){
        if(err){
            return res.renderModal({
                addModal: { errorMessage: err }
            });
        }
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
    var uid = req.user.id;





    var queryString = `SELECT * from bookmarks WHERE bookmark_id =  ${bid}`;
    db.query(queryString, function(err, bookmarks) {
        // if (err) throw err;



        var queryString = `SELECT *
        FROM folders
        WHERE folders.user_id = ${uid}`;
        var folders = [{
            name: 'None',
            folder_id: -1
        }];
        util.queryP(queryString)
        .then(function(data){
            data.forEach(function(val, key){
                folders.push(val);
            });

            var m =  getModals({
                editModal : {
                    bm: bookmarks[0],
                    folders: folders
                }
            })
            console.log('getModals', JSON.stringify(m))

            res.render('index', {
                folders: {},
                dd: filterOptions(),
                loggedIn: true,
                bm :[],
                modals : m
            });
        })
        .catch(function(err){

        });






    });
};
controller.update = function(req, res){
    var bid = req.params.bid;
    var title = db.escape(req.body.title);
    var url = db.escape(req.body.url);
    var description = db.escape(req.body.description);
    var keywords = db.escape(req.body.keywords);
    var folder_id = db.escape(req.body.folders);
    // if(url.substring(0,6) != "http://"){
    //     url = "http://" + url;
    // }

    var queryString = 'UPDATE bookmarks SET title = ' + title +
    ', url = ' + url +
    ', description = ' + description+
    ', keywords = ' + keywords+
    ', folder_id = ' + folder_id +
    ' WHERE bookmark_id = ' + bid;
    db.query(queryString, function(err){
        // if (err) throw err;
        res.redirect('/v1/bm/');
    });
};





controller.deleteForm = function(req, res) {
    var bid = req.params.bid;
    db.query('SELECT * from bookmarks WHERE bookmark_id =  ' + bid, function(err, bookmarks) {
        if (err) throw err;

        res.render('index', {
            folders: {},
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
        // if (err) throw err;
        res.redirect('/v1/bm/');
    });
};

controller.addFolderForm = function(req, res){
    var uid = 1;
    res.render('index', {
        folders: {},
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
    var uid = req.user.id;
    var name = db.escape(req.body.name);
    var desc = db.escape(req.body.description);
    var keyword = db.escape(req.body.keyword);

    var queryString = 'INSERT INTO folders (name, description, keyword, user_id) VALUES (' + name +', ' + desc + ', ' + keyword + ', ' + uid + ')';
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
        // if(err) throw err;
        res.redirect('/v1/bm/');
    })
}



module.exports = controller;
