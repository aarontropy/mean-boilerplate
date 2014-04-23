'use strict';


module.exports = exports = function(app, passport, config) {
    var adminApp = require('../apps/admin')(passport, config),
        main = require('./controllers/main');

    // Mount the admin application
    app.use('/admin', adminApp);

    app.get('/', main.index);
    app.get('/login', main.loginPage);
    app.post('/login', function(req, res, next) {main.login(req, res, next, passport);});
    app.get('/logout', main.logout);

    app.get('/me', main.me);


    /// catch 404 and forwarding to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


};