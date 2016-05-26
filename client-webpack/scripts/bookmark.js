var axios = require('axios');
var util = require('./util.service');

var Bookmark = {};

function get(path, param){
    var params = params || {};
    axios.get(path, param)
    .then(function (response) {
        if(response.status == 200){
            util.load(response.data);
        }
    })
    .catch(function (response) {
        util.handleError(response);
    });
}

/**
* Bookmark
*/
Bookmark.list = function(event){
    if(event){
        event.preventDefault();
    }
    get('/v2/bm');
}

/**
* Bookmark
*/
Bookmark.search = function(event){
    event.preventDefault();
    var searchValue = document.getElementById("bm-search").value;

    get('/v2/bm', {
        params: {
            keyword: searchValue
        }
    });
}

/**
* Bookmark
*/
Bookmark.filter = function(event){
    event.preventDefault();
    var sortValue = document.getElementById("bm-sort").value;
    get('/v2/bm', {
        params: {
            orderBy: sortValue
        }
    });
}


/**
* Bookmark
*/
Bookmark.openAddModal = function(){
    axios.get('/v2/folder')
    .then(function(response){
        util.load(response.data);
    })
    .catch(function(response){
        console.log('Error', response);
    });
};

/**
* Bookmark
*/
Bookmark.add = function(event){
    var form = event.target.form;

    if(!form.checkValidity()){
        return console.log('add() -> checkValidity()');
    }

    var name = form['name-add'].value;
    var address = form['address-add'].value;
    var description = form['description-add'].value;
    var keyword = form['keyword-add'].value;
    var folders = form['folders'].value;


    axios.post('/v2/bm/', {
        title: name,
        url: address,
        description: description,
        keywords: keyword,
        folders: folders
    })
    .then(function (response) {
        if(response.status == 201 || response.status == 200 ){
            Bookmark.list();
        }
    })
    .catch(function (response) {
        console.log('Error', response);
    });

    event.preventDefault();
};

/**
* Bookmark
*/
Bookmark.openDeleteModal = function(event){
    var bm = JSON.parse(event.target.parentNode.parentNode.dataset.bm);

    console.log(event);
    event.preventDefault();
    //TODO
    util.load({
        modals: {
            deleteModal: bm
        }
    })
};

/**
* Bookmark
*/
Bookmark.delete = function(event, bookmarkId){
    event.preventDefault();

    //TODO
    axios.delete('/v2/bm/'+bookmarkId)
    .then(function (response) {
        if(response.status == 204 || response.status == 200 ){
            Bookmark.list();
        }
    })
    .catch(function (response) {
        console.log('Error', response);
    });
};

/**
* Open edit bookmark form
*/
Bookmark.openEditModal = function(event, bookmarkId){
    event.preventDefault();
    //TODO
    util.load({
        modals: {
            editModal: {}
        }
    })
};

/**
* Edit bookmark
*/
Bookmark.edit = function(bookmarkId){
    event.preventDefault();
    //TODO
    axios.put('/v2/bm/', {
        title: name
    })
    .then(function (response) {
        if(response.status == 201 || response.status == 200 ){
            Bookmark.list();
        }
    })
    .catch(function (response) {
        util.handleError(response);
    });
};

/**
* Star bookmark
*/
Bookmark.star = function(event, bookmarkId){
    event.preventDefault();
    axios.put('/v2/bm/star', {
        title: name
    })
    .then(function (response) {
        if(response.status == 201 || response.status == 200 ){
            Bookmark.list();
        }
    })
    .catch(function (response) {
        util.handleError(response);
    });
};



module.exports =  Bookmark;
