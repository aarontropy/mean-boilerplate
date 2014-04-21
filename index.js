'use strict';

var passport = require('passport'),
    express = require('express'),
    mongoose = require('mongoose');


var config = require('./server/config/config');
var db = mongoose.connect(config.db);
// gridFS?

// ==== BOOTSTRAP EXPRESS ======================================================
var app = express();

config.models();                            // Always call this first
config.passport(app, passport, config);
config.express(app, passport, config);
config.routes(app, passport, config);
// =============================================================================

app.listen(config.port);
console.log('Application started on port ' + config.port + ' in ' + process.env.NODE_ENV + ' mode...');

module.exports = exports = app;