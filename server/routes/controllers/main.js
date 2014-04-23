'use strict';

exports.index = function(req,res) {
    res.render('index');
};

exports.login = function(req, res) {
    res.render('admin/login');
};