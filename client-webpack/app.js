var util = require('./scripts/util.service.js'); // Custom Utils
var axios = require('axios');  // Light Weight AJAX Library
var folder = require('./scripts/folder.js');
var bookmark = require('./scripts/bookmark.js');

require("./style/skeleton/css/normalize.css");
require("./style/skeleton/css/skeleton.css");
require("./style/main.css");
require("./style/modal.css");
require("./icomoon.font");


//require("./style/icon.css");
//require("font-awesome-webpack!./font-awesome.config.js");
//require('./style/icons/symbol-defs.svg');

window.bm = {
    'load': loadApp,
    'folder': folder,
    'bookmark': bookmark
}

function loadApp() {
    console.log('App Loaded');
    // Request the intial list data
    bookmark.list();
}
