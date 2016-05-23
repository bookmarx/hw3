var Folder = require('folder.model.js');

var controller = {};
/**
* add a folder to db
*/
controller.addFolder = function(req, res){
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

    })
    .catch(function(err){
        //Handle Error
    })
};

module.exports = controller;
