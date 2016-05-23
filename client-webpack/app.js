var util = require('./scripts/util.service.js'); // Custom Utils
var axios = require('axios');  // Light Weight AJAX Library

document.addEventListener("DOMContentLoaded", function(event) {
    console.log('DOM Loaded.')
    loadApp();

});



function loadApp() {
    util.load();

    axios.get('/v2/bm')
    .then(function (response) {
        if(response.status == 200){
            util.load(response.data);
        }
    })
    .catch(function (response) {
        console.log('Error', response);
    });

}




