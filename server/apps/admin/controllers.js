'use strict';

var mongoose = require('mongoose'),
    Users = mongoose.model('User'),
    _ = require('lodash');

// ==== ROUTE CONTROLLERS ======================================================
exports.index = function(req, res) {
    res.render('index');
};

// ==== API CONTROLLERS ========================================================
exports.api = {
    /**
     * Get a list of users
     * @return {string JSON}
     */
    usersList: function(req, res) {
        Users.find().exec(function(err, users) {
            if (err) { return res.json(501, err); }
            return res.json(users);
        });
    },
    /**
     * Create a user
     * @return {string JSON}
     */
    usersCreate: function(req, res) {
        var user = new Users(req.body);
        user.save(function(err, user) {
            if (err || !user) { return res.json(500, err); }
            res.json(user);
        });
    },
    /**
     * Get a single user's data
     * @return {string JSON}
     */
    usersDetail: function(req, res) {
        res.json(req.userItem);
    },
    /**
     * Update a user
     * @return {string JSON}
     */
    usersUpdate: function(req, res) {
        var user = _.extend(req.userItem, req.body);
        user.save(function(err, user) {
            if (err) { return res.json(500, err); }
            res.json(user);
        });
    },
    /**
     * Delete a user
     * @return {string JSON}
     */
    usersDelete: function(req, res) {
        req.userItem.remove(function(err, n) {
            if (err) { return res.json(500, err); }
            res.json(n);
        });
    }
};

// ==== MIDDLEWARE =============================================================

exports.getUser = function(req, res, next, UserId) {
    Users.findOne({_id: UserId}, '-hashed_password -salt', function(err, user) {
        if (err) {
            next(err);
        } else {
            req.userItem = user;
            next();
        }
    });
};