exports.filterOptions = filterOptions;
exports.getModals = getModals;

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
