'use strict';

var path = require('path'),
    fs = require('fs'),
    utils = require('./utils'),
    assetmanager = require('assetmanager'),
    _ = require('lodash');

// Make sure that the NODE_ENV has a value
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var modelsPath = path.normalize(__dirname + '/../models'),
    routesPath = path.normalize(__dirname + '/../routes'),
    appPath = path.normalize(__dirname + '/../..'),
    viewPath = path.join(appPath,'server/views'),
    assets = require('./assets.json');
assetmanager.init(_.extend({
        debug: (process.env.NODE_ENV !== 'production'),
        webroot: 'public'
    }, assets)
);

var all = {
    appPath: appPath,
    viewPath: viewPath,
    port: process.env.PORT || 3000,
    secret: 'big damn heros',

    express: require('./express'),
    passport: require('./passport'),
    assetmanager: assetmanager,
    models: utils.walker(modelsPath, null, function(file) { 
        require(file); 
    }),
    routes: utils.walker(routesPath, ['middlewares', 'controllers'], function(file, app, passport, config) {
        var route = require(file);
        if (typeof route === 'function') {
            require(file)(app, passport, config);
        } else {
            console.log('ERROR in routes: ' + file + ' is not a function');
        }
    })
};


module.exports = exports = _.extend(
    all,
    require('./env/' + process.env.NODE_ENV)
);