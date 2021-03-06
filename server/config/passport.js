'use strict';

var LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');


module.exports = exports = function(app, passport, config) {
    var User = mongoose.model('User');

    // Serialize the user id to push into the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize the user object based on a pre-serialized token
    // which is the user id
    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id}, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });


    // ==== LOCAL STRATEGY =====================================================
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({ email: email}, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
                user.lastLog = new Date();
                user.save(function(err, s) {
                    return done(null, user);
                });
            });
        }
    ));

};