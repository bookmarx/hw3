var db = require('../db');
var logger = require('../logger');

exports.logger = logger; // Expose logger

/* Interface
---------------------------------------------------------------*/
exports.getModals = getModals;
exports.renderModalMiddleware = renderModalMiddleware;
exports.filterOptions = filterOptions;
exports.queryP = queryP;
exports.starValToCss = starValToCss;
exports.db = db;
/* Defintion
---------------------------------------------------------------*/
function getModals(opts){
    var opts = opts || {};
    return {
        addModal: opts.addModal || 0,
        editModal: opts.editModal || 0,
        deleteModal: opts.deleteModal || 0,
        addFolderModal: opts.addFolderModal || 0,
        importModal: opts.importModal || 0,
        changeModal: opts.changeModal || 0
    };
}


function renderModalMiddleware(){
    return function(req, res, next){
        res.renderModal = function(modalOpt){
            this.render('index', {
                folders: {},
                dd: filterOptions().dd,
                bm: [],
                modals: getModals(modalOpt)
            });
        }
        next();
    }
}


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
        orderFilter: 'title ASC'
    },{
        name: 'Date',
        value: 'Date',
        selected: '',
        orderFilter: 'dateAdded ASC'
    }];
    var filter = {
        name: 'Most Recent',
        value: 'MostRecent',
        selected: '',
        orderFilter: 'bookmark_id DESC'
    };

    for(var i = 0; i < 4; i++){
        if(options[i].value === orderBy){
            options[i].selected = 'selected';
            filter = options[i];

        }
    }

    return {
        dd : options,
        filter : filter
    };
}


function queryP(query){
    return new Promise(function(resolve, reject){
        db.query(query, function(err, data){
            if(err){
                logger.error('queryP error', err)
                return reject(err);
            }
            logger.info('queryP', JSON.stringify(data, null, 2))
            resolve(data);
        })
    })
}

function starValToCss(val){
    return (val) ? 'in-star-full' : 'in-star-empty';
}
