// function login(req, res, next){
//     passport.authenticate('local', function (err, user, info) {
//       var error = err || info;
//       if (error) return res.status(401).json(error);
//       if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});
//
//       var token = auth.signToken(user._id, user.role);
//       res.json({token: token});
//     })(req, res, next)
// }
//
// exports.login = login;
