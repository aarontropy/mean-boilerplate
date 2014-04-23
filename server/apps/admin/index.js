'use strict';

var express = require('express'),
    path = require('path');




module.exports = exports = function(passport, config) {
    var app = express();

    app.set('name', 'admin');

    app.set('views', path.join(config.viewPath, app.get('name')));
    require('./routes')(app, passport, config);

    return app;
}