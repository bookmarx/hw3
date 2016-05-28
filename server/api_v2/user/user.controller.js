var passport = require('passport');

var auth = require('../../auth/auth');
var db = require('../../db');
var User = require('./user.model')
var controller = {};

var util = require('../util.service');

var getModals = util.getModals;
var filterOptions = util.filterOptions;

var compose = require('composable-middleware')

controller.loginForm = function(req, res){
    res.render('login', { errorMessage: ''})
}
controller.signupForm = function(req, res){
    var errorMessage = req.query.errorMessage;
    res.render('signup', { errorMessage: ''})
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
        res.redirect('/app')
    })(req, res, next)
    // res.redirect('/v2/bm/')
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

    var salt = User.makeSalt();
    var hashedPassword = User.encryptPassword(password, salt);

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
        res.redirect('/v2/');
    });
};

/**
* login a new user
*/
controller.logout = function(req, res){
    res.clearCookie('bm_token');
    res.redirect('/v2/');
    // res.redirect('/v2/bm/')
}

controller.changePassword = function(req, res){
    var user = req.user;
    var oldPass = req.body.oldPassword;
    var newPass = req.body.newPassword;
    var reNewPass = req.body.reNewPassword;

    User.updatePassword({
        user: user,
        oldPass: oldPass,
        newPass: newPass,
        reNewPass: reNewPass
    },function(err, data){
        if(err){
            return res.status(err.status).send(err.msg);
        }
        res.send(data);
    })
}

controller.changePasswordForm = function(req, res){
    res.render('index', {
        folders: {},
        dd: filterOptions(),
        bm: [],
        modals: getModals({
            changeModal: {
                errorMessage: ''
            }
        })
    });
}

var mailer = require('./mailer')


controller.reset = function(req, res){
    var user = req.user;
    var newPass = req.body.newPassword;
    var reNewPass = req.body.reNewPassword;

    User.changePassword({
        user: user,
        newPass: newPass,
        reNewPass: reNewPass
    },function(err, data){
        if(err){
            return res.render('reset', { errorMessage : err.msg });
        }
        var token = auth.signToken(req.user.id, req.user.username);
        res.cookie('bm_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.redirect('/app/');
    })
}

controller.forgot = function(req, res){
    var scriptOn = false; // Prepare isomorphic app

    mailer.sendResetEmail(req)
    .then(function(data){
        if(scriptOn == true){
            return res.json(data)
        }

        res.render('login', { errorMessage : 'Reset email sent! Check your inbox.' });
    })
    .catch(function(err){
        if(scriptOn == true){
            return res.status(400).send(err)
        }
        res.render('forgot', { errorMessage : '' });
    })
}

controller.forgotForm = function(req, res){
    var email = db.escape(req.query.token);
    res.render('forgot', { errorMessage : '' });
}

controller.resetForm = function(req, res){
    console.log('req.user', req.params.resid)
    // var userId = req.user.user_id;

    // Generate a new token to send reset request
    // var token = auth.signToken(req.user.id, req.user.username);
    res.cookie('bm_token', req.params.resid, { expires: new Date(Date.now() + 1000*60*5), httpOnly: true });

    res.render('reset', { errorMessage : '' });
}


module.exports = controller;
