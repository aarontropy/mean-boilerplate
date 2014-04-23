'use strict';


module.exports = exports = function(app, passport, config) {
    var adminApp = require('../apps/admin')(passport, config),
        main = require('./controllers/main');

    // Mount the admin application
    app.use('/admin', adminApp);

    app.get('/', main.index);
    app.get('/login', main.login);


};