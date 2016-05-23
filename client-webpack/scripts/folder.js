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
    addListenerHelper('.............', 'clicked', function(event){
        event.preventDefault();
        var searchValue = document.getElementById('.............').value;
        path = '/v2/folder';
        param = {
            params: {
                keyword: searchValue
            }
        };
        get(path, param);
    });
}




module.exports = folders;
