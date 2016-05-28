var crypto = require('crypto');
var db = require('../../db')
/**
* Methods
*/
User = {

    updatePassword: function(opts, cb){
        var user = opts.user;
        var oldPass = opts.oldPass;
        var newPass = opts.newPass;
        var reNewPass = opts.reNewPass;

        // Now authenticate and change password
        if(this.authenticate(oldPass, user.hashedPassword, user.salt)) {
            this.changePassword(opts, cb)
        } else {
            return cb({ status: 400, msg: 'Your old password is invalid!'});
        }
    },

    changePassword: function(opts, cb){
        var user = opts.user;
        var newPass = opts.newPass;
        var reNewPass = opts.reNewPass;

        if(!newPass || !reNewPass){
            return cb({ status: 400, msg: 'Password field(s) cannot be blank!'});
        }
        if(newPass !== reNewPass){
            return cb({ status: 400, msg: 'Password fields do not match!'});
        }

        var salt = this.makeSalt();
        var hashedPassword = this.encryptPassword(newPass, salt);
        var queryString = `UPDATE users SET hashedPassword = '${hashedPassword}', salt = '${salt}'  WHERE username = '${user.username}'`;
        db.query(queryString, function(err, data){
            if (err && err.code === 'ER_DUP_ENTRY') {
                return cb({ status: 500, msg: 'That email already exists!'});
            } else if (err) {
                return cb({ status: 500, msg: 'Sign up failed try again!' });
            }
            cb(null, data);
        });
    },
    /**
    * Authenticate - check if the passwords are the same
    *
    * @param {String} plainText
    * @return {Boolean}
    * @api public
    */
    authenticate: function(plainText, hashedPassword, salt) {
        var testHash = this.encryptPassword(plainText, salt);
        console.log('auth', testHash, ' | ', hashedPassword)
        return testHash === hashedPassword;
    },

    /**
    * Make salt
    *
    * @return {String}
    * @api public
    */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
    * Encrypt password
    *
    * @param {String} password
    * @return {String}
    * @api public
    */
    encryptPassword: function(password, salt) {
        if (!password || !salt) return '';
        var salt = new Buffer(salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

module.exports = User;
