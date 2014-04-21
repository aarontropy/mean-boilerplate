'use strict';

var path = require('path'),
    fs = require('fs'),
    utils = require('./utils'),
    _ = require('lodash');

// Make sure that the NODE_ENV has a value
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var modelsPath = path.normalize(__dirname + '/../models');
var routesPath = path.normalize(__dirname + '/../routes');

var all = {
    appPath: path.normalize(__dirname + '/../..'),
    port: process.env.PORT || 3000,
    secret: 'big damn heros',

    express: require('./express'),
    passport: require('./passport'),
    models: utils.walker(modelsPath, null, function(file) { 
        require(file); 
    }),
    routes: utils.walker(routesPath, ['middleware', 'controllers'], function(file, app, passport, config) {
        require(file)(app, passport, config);
    })
};


module.exports = exports = _.extend(
    all,
    require('./env/' + process.env.NODE_ENV)
);