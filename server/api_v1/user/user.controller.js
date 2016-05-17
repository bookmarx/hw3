var passport = require('passport');

var auth = require('../../auth/auth');
var db = require('../../db');
var model = require('./user.model')
var controller = {};

var util = require('../util.service');

var getModals = util.getModals;
var filterOptions = util.filterOptions;


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
        // console.log('user', user)
        var error = err || info;
        if (error) return res.render('login', { errorMessage: error.message });
        //res.status(401).json(error);
        if (!user) return res.render('login', { errorMessage: 'Your username or password did not match.' });
        //res.status(404).json({message: 'Something went wrong, please try again.'});
        console.log('login user',  user)
        var token = auth.signToken(user.id, user.username);
        res.cookie('bm_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
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
        console.log('err', err)
        if (err && err.code === 'ER_DUP_ENTRY') {
            return res.render('signup', { errorMessage: 'That email already exists!' });
        } else if (err)  {
            return res.render('signup', { errorMessage: 'Sign up failed try again!' });
        }
        res.redirect('/v1/');
    });
};

/**
* login a new user
*/
controller.logout = function(req, res){
    res.clearCookie('bm_token');
    res.redirect('/v1/');
    // res.redirect('/v1/bm/')
}

controller.changePassword = function(req, res){
    var userId = req.user.user_id;
    var oldPass = req.body.oldPassword;
    var newPass = req.body.newPassword;
    var reNewPass = req.body.reNewPassword;

    if(!newPass || !reNewPass){
        return res.renderModal({
            changeModal: { errorMessage: 'Password field(s) cannot be blank!' }
        });

    }

    if(newPass !== reNewPass){
        return res.renderModal({
            changeModal: { errorMessage: 'Password fields do not match!' }
        });
    }
    // Now authenticate and change password
    if(model.authenticate(oldPass, req.user.hashedPassword, req.user.salt)) {
        var salt = model.makeSalt();
        var hashedPassword = model.encryptPassword(newPass, salt);
        var queryString = `UPDATE users SET hashedPassword = '${hashedPassword}', salt = '${salt}'  WHERE username = '${req.user.username}'`;
        db.query(queryString, function(err){
            if (err && err.code === 'ER_DUP_ENTRY') {
                return res.renderModal({ changeModal: { errorMessage: 'That email already exists!' } });
            } else if (err) {
                console.log('update error', err)
                return res.renderModal({ changeModal: { errorMessage: 'Sign up failed try again!'  } });
            }
            res.redirect('/v1/bm/');
        });

    } else {
        return res.renderModal({
            changeModal: { errorMessage: 'Your old password is invalid!' }
        });
    }
}

controller.changePasswordForm = function(req, res){
    res.render('index', {
        dd: filterOptions(),
        bm: [],
        modals: getModals({
            changeModal: {
                errorMessage: ''
            }
        })
    });
}

module.exports = controller;
