'use strict';

module.exports = exports = function(app, passport, config) {
    var admin = require('./controllers/admin');

    app.get('/login', admin.login);
    app.get('/admin', admin.index);
};