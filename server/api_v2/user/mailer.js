var nodemailer = require('nodemailer');
var util = require('../util.service')
var auth = require('../../auth/auth');
var db = require('../../db');

const EXPIRE_TIME = 60*5;
var pass = process.env.BM_EMAIL_PASS;

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(`smtps://bookmarx136:${pass}@smtp.gmail.com`);

var mailer = {};

mailer.sendResetEmail = function(req){
    var email = db.escape(req.body.email);
    console.log('Sending password reset email:', email);

    return new Promise(function(resolve, reject){
        util.queryP(`SELECT * from users WHERE username = ${email.toLowerCase()} LIMIT 1`)
        .then(function(data){
            var host = req.headers.origin || 'http://localhost:9000';
            // console.log('req', req)
            var user = data[0];
            console.log('user', user)
            var body = JSON.stringify(user);

            var token = auth.signToken(user.id, user.username, EXPIRE_TIME);

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: '"Bookmarx" <bookmarx136@gmail.com>', // sender address
                to: user.username, // list of receivers
                subject: 'Password Reset', // Subject line
                text: `This is a temporary link to reset your password. It will expire in 5 minutes.
                Copy and paste the link into your browser to reset password: http://${host}/reset/${token}`, // plaintext body
                html: `<p>This is a temporary link to reset your password. It will expire in 5 minutes.
                 <a href="${host}/reset/${token}">Click here</a> to reset your password.
                 </p>` // html body
            };
            // resolve(mailOptions);
            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    reject(error)
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
                resolve(info)
            });
        })
        .catch(function(err){
            reject(err)
        })
    })



}

module.exports = mailer;
