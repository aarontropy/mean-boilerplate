'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');


var UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    created: {type: Date, default: Date.now},
    lastLog: Date,
    roles: [{type: String, default: 'authenticated'}],

    hashed_password: String,
    salt: String
});


/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

UserSchema.methods = {

    /**
     * HasRole - check if the user has required role
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    hasRole: function(role) {
        var roles = this.roles;
        return (roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1);
    },
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password || !this.salt) { return ''; }
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

var User = mongoose.model('User', UserSchema);

// if there is no admin user in the database, create one
User.find({ roles: 'admin' }).count().exec(function(err, n) {
    if (n === 0) {
        console.log('Creating new Admin');
        var admin = new User({
            name: 'admin',
            email: 'admin@admin.com',
            roles: ['admin'],
            password: 'admin'
        });
        admin.save();
    }
});