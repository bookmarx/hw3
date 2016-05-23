var util = require('./scripts/util.service.js'); // Custom Utils
var axios = require('axios');  // Light Weight AJAX Library

document.addEventListener("DOMContentLoaded", function(event) {
    console.log('DOM Loaded.')
    loadApp();
});


function loadApp() {
    // Intial Render to show the basic app, meanwhile the server request the inital list data
    util.load();

    // Request the intial list data
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

