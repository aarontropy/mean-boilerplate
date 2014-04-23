'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    if (!res.locals.user) {
        res.locals.user = req.user;
    }
    next();
};

/**
 * Generic require Admin routing middleware
 * Basic Role checking - future release with full permission system
 */
exports.requiresAdmin = function(req, res, next) {
    if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
        return res.redirect('/login?redirect=' + req.originalUrl);
    }
    if (!res.locals.user) {
        res.locals.user = req.user;
    }
    next();
};


exports.requiresAdminOrSelf = function(req, res, next) {
    if (req.isAuthenticated() && (req.user.hasRole('admin') || req.user._id === req.userItem._id)) {
        next();
    } else {
        res.send(401, 'User is not authorized');
    }
};