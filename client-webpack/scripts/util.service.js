exports.filterOptions = filterOptions;
exports.getModals = getModals;
exports.createOptions = createOptions;
exports.loadTemplate = loadTemplate;
exports.load = load;
exports.handleError = handleError;

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
        editFolderModal: opts.editFolderModal || 0,
        importModal: opts.importModal || 0,
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
        modals:   getModals(opts.modals)
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
    loadTemplate('main', createOptions(data));

}

/**
* Handle Errors
*/
function handleError(res, statusCode){
    console.log('handleError:', res.data);
    if(res.status === 403 || res.status === statusCode){
        window.location.replace('/');
    }
}
