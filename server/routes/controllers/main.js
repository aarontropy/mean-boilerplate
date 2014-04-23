'use strict';




exports.index = function(req,res) {
    res.render('index');
};

exports.loginPage = function(req, res) {
    res.render('login');
};

/**
 * Log a user in and redirect
 * @param  {request}   req
 * @param  {response}   res
 * @param  {Function} next
 * @param  {passport instance}   passport
 * @return {none or next()}
 */
exports.login = function(req, res, next, passport) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json(401, {error: 'Username or password incorrect'}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send('success');
        });
    })(req, res, next);
};

/**
 * Log a user out and redirect
 * @param  {request} req
 * @param  {response} res
 * @return {none}
 */
exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Get information for the currently logged-in user
 * @param  {request} req
 * @param  {response} res
 * @return {string (JSON)}
 */
exports.me = function(req, res) {
    return res.json(req.user);
};