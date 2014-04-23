'use strict';

angular.module('site')
.factory('Auth', ['$http', '$window', function($http, $window) {
    var me = {};
    return {
        /**
         * Get user data
         * @return {me object}
         */
        me: function() {
            $http.get('/me')
                .success(function(data, status, headers, config) {
                    me = data;
                })
                .error(function(data, status, headers, config) {
                    me = {error: data};
                });
            return me;
        },
        /**
         * Logs a user in
         * @return {data object}
         */
        login: function(credentials) {

            // $http will silently follow redirects
            return $http.post('/login' + $window.location.search, credentials);
        },
        /**
         * Logs a user out
         * @return {data object}
         */
        logout: function() {
            return $http.get('/logout');
        }

    };
}]);