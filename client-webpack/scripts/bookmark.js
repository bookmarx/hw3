var axios = require('axios');
var Bookmark = {};

Bookmark.addListeners = function addListeners(cb){
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

    document.getElementById("bm-search-form").addEventListener("submit", function(event){
        event.preventDefault();
        var searchValue = document.getElementById("bm-search").value;
        path = '/v2/bm';
        param = {
            params: {
              keyword: searchValue
            }
        };
        get(path, param);
    });

    document.getElementById("bm-search-button").addEventListener("click", function(event){
        event.preventDefault();
        var searchValue = document.getElementById("bm-search").value;
        path = '/v2/bm';
        param = {
            params: {
              keyword: searchValue
            }
        };
        get(path, param);
    });

    document.getElementById("bm-filter-button").addEventListener("click", function(event){
        event.preventDefault();
        var sortValue = document.getElementById("bm-sort").value;
        path = '/v2/bm';
        param = {
            params: {
              orderBy: sortValue
            }
        };
        get(path, param);
    });
}



module.exports =  Bookmark;
