'use strict';

var admin = require('./controllers');

module.exports = exports = function(app, passport, config) {
    
    app.get('/', admin.index);
}