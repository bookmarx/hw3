var util = require('./scripts/util.service.js'); // Custom Utils
var axios = require('axios');  // Light Weight AJAX Library
var folder = require('./scripts/folder.js');
var bookmark = require('./scripts/bookmark.js');


document.addEventListener("DOMContentLoaded", function(event) {
    console.log('DOM Loaded.');
    loadApp();
    window.bm = {
        'folder': folder,
        'bookmark': bookmark
    }
});


function loadApp() {
    // Request the intial list data
    bookmark.list();
}
