var util = require('../util.service');
var db = require('../../db')

var model = {};
model.db = db;

/**
* find one folder by id
*/
model.find = function find(data){
    var queryString = `SELECT * FROM folders WHERE folder_id = ${data.id} AND user_id = ${data.uid}`;
    return db.queryP(queryString);
}
/**
* find all folders belonging to the user
*/
model.list = function find(data){
    var queryString = `SELECT * FROM folders WHERE user_id = ${data.uid}`;
    return db.queryP(queryString);
}

/**
* add a folder to db
*/
model.insert = function(data){
    var queryString = `INSERT INTO folders (name, description, keyword, user_id)
    VALUES ( ${data.name}, ${data.desc}, ${data.keyword}, ${data.uid})`;
    return db.queryP(queryString);
};

/**
* remove a folder to db
*/
model.remove = function(data){
    var queryString = `DELETE from folders WHERE folder_id = ${data.id} AND user_id = ${data.uid}`;
    return db.queryP(queryString);
};

/**
* update a folder to db
*/
model.update = function(data){
    var queryString = `UPDATE bookmarks SET title = ${data.title},
    url = ${data.url},
    description = ${data.description},
    keywords = ${data.keywords},
    folder_id = ${data.folder_id }
    WHERE bookmark_id =   ${data.bid}`;

    return db.queryP(queryString);
};


module.exports = model;
