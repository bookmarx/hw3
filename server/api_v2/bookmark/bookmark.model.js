var util = require('../util.service');
var db = require('../../db')
/* Interface
---------------------------------------------------------------*/
exports.where = where;
exports.getFoldersByUser = findFoldersByUser;
exports.find = find;
exports.findOne = findOne;

/* Definition
---------------------------------------------------------------*/
function where(keyword, uid){
    if(keyword){
        var word =  db.escape(`%${keyword}%`);
        return `WHERE ( bookmarks.title LIKE ${word}
        OR bookmarks.description LIKE ${word}
        OR bookmarks.keywords LIKE ${word}
        OR bookmarks.url LIKE ${word} )
        AND bookmarks.user_id = ${uid}`;
    } else {
        return `WHERE bookmarks.user_id = ${uid}`;
    }

}

function findFoldersByUser(keyword, uid){
    var queryString = `SELECT bookmarks.*, folders.name
    FROM bookmarks
    RIGHT JOIN folders on bookmarks.folder_id = folders.folder_id
    ${where(keyword, uid)} AND folders.user_id = ${uid}`;
    return db.queryP(queryString);
}


function find(keyword, uid, orderBy){
    var queryString = `SELECT * FROM bookmarks ${where(keyword, uid)} AND bookmarks.folder_id < 1 ORDER BY ${orderBy}`;
    return db.queryP(queryString);
}

function findOne(data){
    var queryString = `SELECT * FROM bookmarks WHERE bookmarks.bookmark_id =  ${data.bid} AND bookmarks.user_id = ${data.uid}`;
    return db.queryP(queryString);
}
