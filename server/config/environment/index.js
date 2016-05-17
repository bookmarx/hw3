var _ = require('underscore');
var path = require('path');

var defaultSettings = {
    env: process.env.NODE_ENV || 'development',

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 3000,

    mysql : {
        DATABASE_HOST:     process.env.MYSQL_HOST,
        DATABASE_USER:     process.env.MYSQL_USER,
        DATABASE_PASSWORD: process.env.MYSQL_PASS,
        DATABASE_NAME:     process.env.MYSQL_NAME
    },
    secrets: {
        session: 'N0deJS1sAw3some'
    }
};

module.exports = _.extend(
    defaultSettings,
    require('./' + (process.env.NODE_ENV || 'development') + '.js') || {});
