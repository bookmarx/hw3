var passport = require('passport');

var auth = require('../../auth/auth');
var db = require('../../db');
var model = require('./user.model')
var controller = {};

controller.loginForm = function(req, res){
    res.render('login', { errorMessage: '' })
}
controller.signupForm = function(req, res){
    var errorMessage = req.query.errorMessage;
    res.render('signup', { errorMessage: '' })
}

/**
* login a new user
*/
controller.login = function(req, res, next){
    passport.authenticate('local', function (err, user, info) {
        console.log('user', user)
        var error = err || info;
        if (error) return res.render('login', { errorMessage: error.message });
        //res.status(401).json(error);
        if (!user) return res.render('login', { errorMessage: 'Something went wrong, please try again.' });
        //res.status(404).json({message: 'Something went wrong, please try again.'});

        var token = auth.signToken(user._id, user.role);
        res.cookie('bm_token',token, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.redirect('/v1/bm/')
    })(req, res, next)
    // res.redirect('/v1/bm/')
}

/**
* Create
* Signup a new user
*/
controller.signup = function(req, res){
    var username = db.escape(req.body.username);
    var password = req.body.password;
    var repassword = req.body.repassword;
    if(password !== repassword){
        return res.render('signup', { errorMessage: 'Password does not match!' });
    }

    if(!username || !password || !repassword){
        return res.render('signup', { errorMessage: 'Username or Password cannot be blank!' });
    }

    var salt = model.makeSalt();
    var hashedPassword = model.encryptPassword(password, salt);

    // console.log(`signup ${username} | ${password} | ${salt} | ${hashedPassword}`)
    var queryString = `INSERT INTO users (username, hashedPassword, salt) VALUES ( ${username}, '${hashedPassword}', '${salt}' )`;
    console.log('signup' + queryString)

    db.query(queryString, function(err){
        if (err) return res.render('signup', { errorMessage: 'Sign up failed try again!' });
        res.redirect('/v1/');
    });
};


controller.update = function(){}

module.exports = controller;
