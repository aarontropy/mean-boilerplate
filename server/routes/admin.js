'use strict';

module.exports = exports = function(app, passport, config) {
    var admin = require('./controllers/admin');

    app.get('/admin', admin.dashboard);
};