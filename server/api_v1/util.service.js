var db = require('../db');

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


function renderModalMiddleware(){
    return function(req, res, next){
        res.renderModal = function(modalOpt){
            this.render('index', {
                dd: filterOptions(),
                bm: [],
                modals: getModals(modalOpt)
            });
        }
        next();
    }
}
exports.renderModalMiddleware = renderModalMiddleware;

function filterOptions(){
    return [{
        name: 'Most Recent',
        value: 'MostRecent',
        selected: ''
    },{
        name: 'Favorites',
        value: 'Favorites',
        selected: ''
    },{
        name: 'Alphabetical',
        value: 'Alphabetical',
        selected: ''
    },{
        name: 'Date',
        value: 'Date',
        selected: ''
    }];
}


function where(keyword, uid){
    if(keyword){
        var word =  db.escape(`%${keyword}%`);
        return `WHERE title LIKE ${word} OR description LIKE ${word} OR keywords LIKE ${word} OR url LIKE ${word} AND user_id = ${uid}`;
    } else {
        return `WHERE user_id = ${uid}`;
    }

}

exports.getModals = getModals;
exports.filterOptions = filterOptions;
exports.where = where;
