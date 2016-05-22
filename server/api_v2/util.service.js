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

/* Defintion
---------------------------------------------------------------*/
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
    var selectedVal;

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

function starValToCss(val){
    return (val) ? 'fa-star' : 'fa-star-o';
}
