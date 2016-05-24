var folders = {};

function addListenerHelper(id, evt, cb){
    document.getElementById(id).addEventListener(evt, cb)
}

folders.addListeners = function addListeners(cb){
    function get(path, param){
        axios.get(path, param)
        .then(function (response) {
            if(response.status == 200){
                cb(response.data);
            }
        })
        .catch(function (response) {
            console.log('Error', response);
        });
    }

    // update
    document.getElementById('bm-add-folder-btn')
    .addEventListener('click', function(){
        util.load({
            modals: {
                addFolderModal: {
                    name: "Name",
                    description: "description",
                    keyword: "Keywords"
                }
            }
        })
    });

    // SAVE button in addFolderModal
    addListenerHelper('bm-add-folder-save-btn', 'submit', function(event){
        event.preventDefault();
        var name = document.getElementById('name-folder').value;
        var description = document.getElementById('description-folder').value;
        var keyword = document.getElementById('keyword-folder').value;
        path = '/v2/folder';
        param = {
            params: {
              name: name,
              description: description,
              keyword: keyword
            }
        };
        post(path, param);
    });

    //CANCEL button in addFolderModal
    addListenerHelper('bm-add-folder-cancel-btn', 'click', function(evt){
      axios.get('/v2/folder'){
        
      }
    })

    addListenerHelper('bm-edit-folder-save-btn', 'submit', function(event){
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
    });
}




module.exports = folders;
