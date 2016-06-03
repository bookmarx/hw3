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
        alert(response)
        util.handleError(response);
    });
}

/**
* Bookmark
*/
Bookmark.list = function(event){
    console.log('bm.list()');
    if(event){
        event.preventDefault();
    }
    mixpanel.track("List-Button");
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
    mixpanel.track("Search-Button");
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
    mixpanel.track("Filter-Button");
}


/**
* Bookmark
*/
Bookmark.openAddModal = function(event){
    event.preventDefault();
    axios.get('/v2/folder')
    .then(function(response){
        util.load({
            modals: {
                addModal: {
                    folders: response.data.folders
                }
            }
        });
    })
    .catch(function(response){
        console.log('Error', response);
    });
    mixpanel.track("AddModal-Button");
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
    mixpanel.track("Add-Button");

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
    mixpanel.track("OpenDeleteModal-Button");
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
    mixpanel.track("Delete-Button");
};

/**
* Open edit bookmark form
*/
Bookmark.openEditModal = function(event){
    var bm = JSON.parse(event.target.parentNode.parentNode.dataset.bm);
    event.preventDefault();


    axios.get('/v2/folder/')
    .then(function(response){
        util.load({
            modals: {
                editModal: {
                    folders: response.data.folders,
                    bm: bm
                }
            }
        });
    })
    .catch(function(response){
        console.log('Error', response);
    });
    mixpanel.track("OpenEditModal-Button");
};

/**
* Edit bookmark
*/
Bookmark.edit = function(event){
    event.preventDefault();
    var form = event.target;

    var bid = form.dataset.bmId;

    var name = form['name-edit'].value;
    var address = form['address-edit'].value;
    var description = form['description-edit'].value;
    var keyword = form['keyword-edit'].value;
    var folders = form['folders'].value;


    //TODO
    axios.put('/v2/bm/'+bid, {
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
        util.handleError(response);
    });
    mixpanel.track("Edit-Button");
};

/**
* Star bookmark
*/
Bookmark.star = function(event){
    event.preventDefault();

    var bm = JSON.parse(event.target.parentNode.parentNode.dataset.bm);

    axios.put('/v2/bm/star/'+bm.bookmark_id)
    .then(function (response) {
        if(response.status == 201 || response.status == 200 ){
            Bookmark.list();
        }
    })
    .catch(function (response) {
        util.handleError(response);
    });
    mixpanel.track("Star-Button");
};

Bookmark.openImportModal = function(){
    util.load({
        modals: {
            importModal: {}
        }
    })
};

Bookmark.import = function(event){
    event.preventDefault();

    var form = event.target;
    console.log("####form", form);

    //var file = form['file-import'].files[0];
    var fileData = new FormData(form);
    //fileData.append("File1", file, "import.json");

    axios.post('/v2/bm/import', fileData)
    .then(function (response) {
        if(response.status == 201 || response.status == 200 ){
            Bookmark.list();
        }
    })
    .catch(function (response) {
        util.handleError(response);
    });

};

Bookmark.openChangeModal = function(){
    util.load({
        modals: {
            changeModal: {}
        }
    })
    mixpanel.track("OpenChangeModal-Button");
}

Bookmark.change = function(){
    var user = event.target;
console.log(user);

    event.preventDefault();

    var oldPass = user['oldPassword'].value;
    var newPass = user['newPassword'].value;
    var reNewPass = user['reNewPassword'].value;

    axios.post('/change/', {
        oldPassword: oldPass,
        newPassword: newPass,
        reNewPassword: reNewPass
    })
    .then(function (response) {
        if(response.status == 201 || response.status == 200 ){
            Bookmark.list();
        }
    })
    .catch(function (response) {
        console.log(response.data)
        if(response.status === 400) {
            util.load({
                modals: response.data
            })
        } else {
            handleError(response);
        }
    });
    mixpanel.track("ChangePassword-Button");
}

Bookmark.searchFocus = function(e, isFocus){
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    console.log('width', width)
    if(isFocus){
        document.getElementById('bm-sort-form').style.display = 'none';
    } else {
        document.getElementById('bm-sort-form').style.display = 'flex';
    }

}


module.exports =  Bookmark;
