
var util = require('./util.service');
var axios = require('axios');
var folders = {};

function addListenerHelper(id, evt, cb){
    document.getElementById(id).addEventListener(evt, cb)
}

folders.closeModal = function(){
    axios.get('/v2/bm')
    .then(function (response) {
        if(response.status == 200){
            util.load(response.data);
        }
    })
    .catch(function (response) {
        console.log('Error', response);
    });
}

folders.saveFolder = function(event){
    event.preventDefault();
    var name = document.getElementById('name-folder').value;
    var description = document.getElementById('description-folder').value;
    var keyword = document.getElementById('keyword-folder').value;

    axios.post('/v2/folder', {
      name: name,
      description: description,
      keyword: keyword,
    })
    .then(function(response) {
        folders.closeModal();
    })
    .catch(function(response) {
      console.log('Error', response);
    })
}

/**
* Update The Folder - Incomplete
*/
folders.updateFolder = function(event){
    event.preventDefault();
    var name = document.getElementById('name-edit-folder').value;
    var description = document.getElementById('description-edit-folder').value;
    var keyword = document.getElementById('keyword-edit-folder').value;

    axios.put('/v2/folder', {
      name: name,
      description: description,
      keyword: keyword,
    })
    .then(function(response) {

    })
    .catch(function(response) {
      console.log('Error', response);
    })
}
/**
* Open the Edit Folder Modal - Incomplete
*/
folders.openModal = function(){
    util.load({
        modals: {
            addFolderModal: {
                name: "Name",
                description: "description",
                keyword: "Keywords"
            }
        }
    })
}
/**
* Update the Edit Folder Modal - Incomplete
*/
folders.openEditFolderModal = function(){
    console.log('hi');
    util.load({
      modals: {
          editFolderModal: {
              name: "Name",
              description: "description",
              keyword: "Keywords"
          }
      }
  })
}

module.exports = folders;
