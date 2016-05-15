var passport = require('passport');

var auth = require('../../auth/auth');
var db = require('../../db');
var model = require('./user.model')
var controller = {};

controller.loginForm = function(req, res){
    res.render('index', { loggedIn: false })
}

/**
* login a new user
*/
controller.login = function(req, res, next){
    passport.authenticate('local', function (err, user, info) {
        console.log('user', user)
      var error = err || info;
      if (error) return res.status(401).json(error);
      if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});

      var token = auth.signToken(user._id, user.role);
      res.cookie('bm_token',token, { expires: new Date(Date.now() + 900000), httpOnly: true });
      res.send(token)
    })(req, res, next)
    // res.redirect('/v1/bm/')
}

/**
* Create
* Signup a new user
*/
controller.signup = function(req, res){
    var username = db.escape(req.body.username);
    var password = db.escape(req.body.password);

    var queryString = `INSERT INTO books (username, password) VALUES ( ${username}, ${password} )`;
    db.query(queryString, function(err){
        if(err){ throw err }
        res.redirect('/v1/bm/');
    });
};


controller.update = function(){}

module.exports = controller;
