'use strict';

exports.dashboard = function(req, res) {
    res.render('admin/dashboard');
};

exports.index = function(req, res) {
    res.render('admin/admin');
};

exports.login = function(req, res) {
    res.render('admin/login');
};