var util = require('./scripts/util.service.js');
var axios = require('axios');

function loadTemplate(name, data){
    var template = require('./views/'+ name +'.ejs');
    return template(data);
}

var options = util.filterOptions();
var getModals = util.getModals;

var opts = {
    dd: options.dd,
    bm: [],
    folders : [],
    loggedIn: true,
    modals: getModals()
}

var tpl = loadTemplate('main', opts);

document.write(tpl);
