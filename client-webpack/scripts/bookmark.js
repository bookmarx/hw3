var axios = require('axios');
var Bookmark = {};
var util = require('./util.service');

function get(path, param){
    axios.get(path, param)
    .then(function (response) {
        if(response.status == 200){
            util.load(response.data);
        }
    })
    .catch(function (response) {
        console.log('Error', response);
    });
}

Bookmark.search = function(event){
    var searchValue = document.getElementById("bm-search").value;
    path = '/v2/bm';
    param = {
        params: {
          keyword: searchValue
        }
    };
    get(path, param);
}

Bookmark.filter = function(event){
    var sortValue = document.getElementById("bm-sort").value;
    path = '/v2/bm';
    param = {
        params: {
          orderBy: sortValue
        }
    };
    get(path, param);
}


Bookmark.add = function(){};
Bookmark.delete = function(){};
Bookmark.edit = function(){};

module.exports =  Bookmark;
