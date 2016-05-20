var db = require('../db');
 var logger = require('../logger');
exports.logger = logger;


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
                folders: {},
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
    },
    {
        name: 'Favorites',
        value: 'Favorites',
        selected: ''
    },
    {
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
        return `WHERE ( bookmarks.title LIKE ${word}
        OR bookmarks.description LIKE ${word}
        OR bookmarks.keywords LIKE ${word}
        OR bookmarks.url LIKE ${word} )
        AND bookmarks.user_id = ${uid}`;
    } else {
        return `WHERE bookmarks.user_id = ${uid}`;
    }

}

// Query Builder
function getFoldersByUser(keyword, uid){
    var queryString = `SELECT bookmarks.*, folders.name
    FROM bookmarks
    RIGHT JOIN folders on bookmarks.folder_id = folders.folder_id
    ${where(keyword, uid)} AND folders.user_id = ${uid}`;
    return queryP(queryString);
}
exports.getFoldersByUser = getFoldersByUser;

function queryP(query){
    return new Promise(function(resolve, reject){
        db.query(query, function(err, data){

            if(err){
                logger.error(err)
                return reject(err);
            }
            logger.info('queryP', JSON.stringify(data, null, 2))
            resolve(data);
        })
    })
}
exports.queryP = queryP;

exports.getModals = getModals;
exports.filterOptions = filterOptions;
exports.where = where;
