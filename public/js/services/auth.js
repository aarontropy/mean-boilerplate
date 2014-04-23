'use strict';

angular.module('site')
.factory('Auth', ['$resource', function($resource) {
    return {
        /**
         * Get user data
         * @return {me object}
         */
        me: function() {
            return $resource('/me').get();
        },
        /**
         * Logs a user in
         * @return {data object}
         */
        login: function(credentials, success, failure) {
            return $resource('/login').save(credentials, success, failure);
        },
        /**
         * Logs a user out
         * @return {data object}
         */
        logout: function() {
            return $resource('/logout').get();
        }

    };
}]);