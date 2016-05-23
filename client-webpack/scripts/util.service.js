var axios = require('axios'); 
exports.filterOptions = filterOptions;
exports.getModals = getModals;
exports.createOptions = createOptions;
exports.loadTemplate = loadTemplate;
exports.load = load;

function filterOptions(orderBy){
    var options = [{
        name: 'Most Recent',
        value: 'MostRecent',
        selected: '',
        orderFilter: 'bookmark_id DESC'
    },
    {
        name: 'Favorites',
        value: 'Favorites',
        selected: '',
        orderFilter: 'star DESC'
    },
    {
        name: 'Alphabetical',
        value: 'Alphabetical',
        selected: '',
        orderFilter: 'dateAdded ASC'
    },{
        name: 'Date',
        value: 'Date',
        selected: '',
        orderFilter: 'title ASC'
    }];
    var filter;

    for(var i = 0; i < options; i++){
        if(options[i].value === orderBy){
            options[i].selected = 'selected';
            filter = options[i];
            break;
        }
    }
    return {
        dd : options,
        filter : filter
    };
}

function getModals(opts){
    var opts = opts || {};
    return {
        addModal: opts.addModal || 0,
        editModal: opts.editModal || 0,
        deleteModal: opts.deleteModal || 0,
        addFolderModal: opts.addFolderModal || 0,
        changeModal: opts.changeModal || 0
    };
}


/**
* Intializes options for needed to render main.ejs
*/
function createOptions(opts){
    var opts = opts || {};
    return {
        dd:       opts.dd      || filterOptions().dd,
        bm:       opts.bm      || [],
        folders : opts.folders || [],
        modals:   opts.modals  || getModals()
    }
}

/**
* Template Loader for EJS
*/
function loadTemplate(name, data){
    var template = require('../views/'+ name +'.ejs');
    var rendered = template(data);
    document.getElementById('bm-view').innerHTML = rendered;
    return rendered;
}


/**
* Main Template Loader for EJS
*/

function load(data){
    loadTemplate('main', createOptions(data))
    addListeners();
}


function addListeners(){
    document.getElementById("bm-search-form").addEventListener("submit", function(event){
        event.preventDefault();
        
        var searchValue = document.getElementById("bm-search").value;
       

        path = '/v2/bm';
        param = {
            params: {
              keyword: searchValue
            }
        };
       
        makeAxiosCall(path, param);
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
       
        makeAxiosCall(path, param);
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
        makeAxiosCall(path, param);
    }); 


}

function makeAxiosCall(path, param){
    axios.get(path, param)
    .then(function (response) {
        if(response.status == 200){
            load(response.data);
        }
    })
    .catch(function (response) {
        console.log('Error', response);
    });
}
