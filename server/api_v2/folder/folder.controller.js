var Folder = require('folder.model.js');

var controller = {};

/**
* list folders
*/
controller.list = function(req, res){};

/**
* create a folder
*/
controller.create = function(req, res){
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
        res.send('Folder Created.');
    })
    .catch(function(err){
        res.status(400).send();
        //Handle Error
    })
};

/**
* show a folder
*/
controller.show = function(req, res){};

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
        console.log('Error', err);
    })
};

/**
* delete a folder
*/
controller.delete = function(req, res){
    var fid = db.escape(req.body.id);
    var uid = req.user.id;

    Folder.remoe({
      fid: fid,
      uid: uid
    })
    .then(function(data){

    })
    .catch(function(err){
        console.log('Error', err);
    })
};

module.exports = controller;
