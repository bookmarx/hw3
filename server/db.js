var mysql = require('mysql');
var logger = require('./logger');

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

            return new Promise(function(resolve, reject){
                MySQL.connection.connect(function(err){
                    if(err) return reject(err);

                    var msg = `Connected to MYSQL:
                    {
                        host     : ${config.DATABASE_HOST},
                        user     : ${config.DATABASE_USER},
                        password : ${config.DATABASE_PASSWORD},
                        database : ${config.DATABASE_NAME}
                    }`;
                    logger.info(msg);
                    resolve(msg);
                });
            })
        },
        query: function(querystring, callback){
            MySQL.connection.query(querystring, callback);
        },
        queryP: function(querystring){
            return new Promise(function(resolve, reject){
                MySQL.connection.query(querystring, function(err, data){
                    if(err) return reject(err);
                    resolve(data)
                });
            })
        },
        escape: mysql.escape
    }
}();

module.exports = MySQL;
