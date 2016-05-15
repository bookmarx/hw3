var mysql      = require('mysql');

var MySQL = function() {
    var connection;

    return {
        init: function(config){
            MySQL.connection = mysql.createConnection({
                host     : config.DATABASE_HOST,
                user     : config.DATABASE_USER,
                password : config.DATABASE_PASSWORD,
                database : config.DATABASE_NAME
            });

            MySQL.connection.connect(function(err){
                console.log('Connecting to MYSQL!')
            });
        },
        query: function(querystring, callback){
            MySQL.connection.query(querystring, callback);
        },
        escape: mysql.escape
    }
}();

module.exports = MySQL;
