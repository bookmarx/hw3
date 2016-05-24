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
Bookmark.list = function(){
    axios.get('/v2/bm')
    .then(function (response) {
        if(response.status == 200){
            util.load(response.data);
        }
    })
    .catch(function (response) {
        if(response.status === 403){
            window.location.replace('/');
        }
        console.log('Error', response);
    });;
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
Bookmark.openAddModal = function(){
    axios.get('/v2/folder')
    .then(function(response){
        util.load(response.data)
    })
    .catch(function(response){
        console.log('Error', response);
    });
};

Bookmark.add = function(event){
    var form = event.target.form;

    var name = form['name-add'].value;
    var address = form['address-add'].value;
    var description = form['description-add'].value;
    var keyword = form['keyword-add'].value;
    var folders = form['folders'].value;

    var re = new RegExp('(http:\/\/.*)|(https:\/\/.*)','i')

    if(!re.test(address)){
        return console.log('error')
    }

    event.preventDefault();

    axios.post('/v2/bm/', {
        title: name,
        clear

        url: address,
        description: description,
        keywords: keyword,
        folders: folders
    })
    .then(function (response) {
        if(response.status == 200){
            util.load(response.data);
        }
    })
    .catch(function (response) {
        console.log('Error', response);
    });
};
Bookmark.delete = function(){};
Bookmark.edit = function(){};

module.exports =  Bookmark;
