var util = require('./util.service');
var axios = require('axios');
var folders = {};

function addListenerHelper(id, evt, cb){
    document.getElementById(id).addEventListener(evt, cb)
}

folders.addListeners = function addListeners(load){
    // function get(path, param){
    //     axios.get(path, param)
    //     .then(function (response) {
    //         if(response.status == 200){
    //             load(response.data);
    //         }
    //     })
    //     .catch(function (response) {
    //         console.log('Error', response);
    //     });
    // }

    // update
    // document.getElementById('bm-add-folder')
    // .addEventListener('click', function(event){
    //     event.preventDefault();
    //     util.load({
    //         modals: {
    //             addFolderModal: {
    //                 name: "Name",
    //                 description: "description",
    //                 keyword: "Keywords"
    //             }
    //         }
    //     })
    // });

    // SAVE button in addFolderModal
    // addListenerHelper('bm-add-folder-save-btn', 'submit', function(event){
    //     event.preventDefault();
    //     var name = document.getElementById('name-folder').value;
    //     var description = document.getElementById('description-folder').value;
    //     var keyword = document.getElementById('keyword-folder').value;
    //
    //     // get('/v2/bm')
    // });

    //CANCEL button in addFolderModal
    // addListenerHelper('bm-add-folder-cancel-btn', 'click', function(evt){
    //     axios.get('/v2/folder')
    //     .then(function(response) {
    //         if(response.status == 200){
    //             util.load(response.data);
    //         }
    //     })
    //     .catch(function (response){
    //         console.log('Error', response);
    //     })
    // })

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
    path = '/v2/folder';
    param = {
        params: {
            name: name,
            description: description,
            keyword: keyword,
        }
    };
    post(path, param);
}

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

module.exports = folders;
