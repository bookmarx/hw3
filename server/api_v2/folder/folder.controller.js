var Folder = require('folder.model.js');
var util = require('../util.service.js');
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
             folders: {},
             dd: filterOptions(),
             loggedIn: true,
             bm :[],
             modals :getModals({
                 addModal : {
                     folders: folders
                 }
             })
         });
     })
     .catch(function(err){
         res.status(500).send(err);
     });
};

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
      if(res.status == 400){
        util.load({
          modals: {
            addFolderModal: {errorMessage: "An error occured."}
          }
        })
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
        util.load({
          modals: {
            editFolderModal: {errorMessage: "An error occured."}
          }
        })
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
          util.load({
            modals: {
              editFolderModal: {errorMessage: "An error occured."}
            }
          })
        }
    })
};

module.exports = controller;
