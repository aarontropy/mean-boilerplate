'use strict';

var admin = require('./controllers');

module.exports = exports = function(app, passport, config) {
    
    app.get('/', admin.index);

    app.get('/api/users', admin.api.usersList);
    app.post('/api/users', admin.api.usersCreate);
    app.get('/api/users/:UserId', admin.api.usersDetail);
    app.put('/api/users/:UserId', admin.api.usersUpdate);
    app.del('/api/users/:UserId', admin.api.usersDelete);

    app.param('UserId', admin.getUser);
};