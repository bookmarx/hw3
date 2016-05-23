var util = require('../util.service');
var db = require('../../db')

var model = {};
model.db = db;
/**
* add a folder to db
*/
model.insert = function(data){
    var queryString = `INSERT INTO folders (name, description, keyword, user_id)
    VALUES ( ${data.name}, ${data.desc}, ${data.keyword}, ${data.uid})`;
    return db.queryP(queryString);
};
/**
* add a folder to db
*/
model.delete = function(data){
    var queryString = `INSERT INTO folders (name, description, keyword, user_id)
    VALUES ( ${data.name}, ${data.desc}, ${data.keyword}, ${data.uid})`;
    return db.queryP(queryString);
};
/**
* add a folder to db
*/
model.update = function(data){
    var queryString = `INSERT INTO folders (name, description, keyword, user_id)
    VALUES ( ${data.name}, ${data.desc}, ${data.keyword}, ${data.uid})`;
    return db.queryP(queryString);
};
/**
* add a folder to db
*/
model.find = function(data){
    var queryString = `INSERT INTO folders (name, description, keyword, user_id)
    VALUES ( ${data.name}, ${data.desc}, ${data.keyword}, ${data.uid})`;
    return db.queryP(queryString);
};
module.exports = model;
