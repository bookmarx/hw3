var Folder = require('./folder.model');
var util = require('../util.service.js');
var db = require('../../db');

var logger = util.logger;
var getModals = util.getModals;
var filterOptions = util.filterOptions;

var controller = {};

/**
 * list folders
 */
controller.list = function(req, res){
    var uid = req.user.id;

    var folders = [{
        name: 'None',
        folder_id: -1
    }];
    Folder.list({ uid: uid })
        .then(function(data){
            data.forEach(function(val, key){
                folders.push(val);
            });

            res.json({
                folders: folders
            });
        })
        .catch(function(err){
            console.log(err)
            res.status(500).send(err);
        });
};

/**
 * create a folder
 */
controller.insert = function(req, res){
    logger.info('[ folder.controller.js - insert() ]');

    var jsOn = (req.headers['x-js-on']) ? true : false;

    var uid = req.user.id;
    var name = db.escape(req.body.name);
    var desc = db.escape(req.body.description);
    var keyword = db.escape(req.body.keyword);

    Folder.insert({
            name: name,
            desc: desc,
            keyword: keyword,
            uid: uid
        })
        .then(function(data){
            if(jsOn) {
                res.json(data);
            } else {
                res.redirect('/v2/bm');
            }
        })
        .catch(function(err){
            logger.error('folder.controller - insert() -> ', err)

            if(jsOn) {
                res.status(400).json({
                    modals: {
                        addFolderModal: {errorMessage: "Couldn't insert folder!"}
                    }
                })
            } else {
                res.renderModal({addFolderModal: "Couldn't insert folder!"});
            }


        })
};

/**
 * show a folder
 */
controller.show = function(req, res) {

};

/**
 * update a folder
 */
controller.update = function(req, res){
    var fid = db.escape(req.body.id);
    var name = db.escape(req.body.name);
    var desc = db.escape(req.body.description);
    var keyword = db.escape(req.body.keyword);

    Folder.update({
            name: name,
            desc: desc,
            keyword: keyword,
            fid: fid
        })
        .then(function(data){

        })
        .catch(function(err){
            if(res.status == 400){
                //util.load({
                //  modals: {
                //    editFolderModal: {errorMessage: "An error occured."}
                //  }
                //})
            }
        })
};

/**
 * delete a folder
 */
controller.delete = function(req, res){
    var fid = db.escape(req.body.id);
    var uid = req.user.id;

    Folder.remove({
            fid: fid,
            uid: uid
        })
        .then(function(data){

        })
        .catch(function(err){
            if(res.status == 400){
                //util.load({
                //  modals: {
                //    editFolderModal: {errorMessage: "An error occured."}
                //  }
                //})
            }
        })
};

// Javascript Off Only
// ------------------------------------------

/**
 * Show Folder Modal
 */
controller.addFolderForm = function(req, res){
    console.log('hi');
    var uid = req.user.id;
    logger.info('[ folder.controller.js - addFolderForm()]');
    res.renderModal({ addFolderModal : uid });
};

module.exports = controller;
