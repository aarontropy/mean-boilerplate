'use strict';


module.exports = exports = function(app, passport, config) {
    var index = require('./controllers/index');

    app.get('/', index.render);

};