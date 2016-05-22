var crypto = require('crypto');
/**
 * Methods
 */
User = {
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
