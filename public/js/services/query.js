'use strict';

angular.module('site')
.factory('Query', ['$window', function($window) {
    var query = {};

    /**
     * Parses $window.location.search
     * @param  {string} key
     * @return {string or object}
     */
    return {
        q: function(key) {

            function parse() {
                var q = $window.location.search,
                    qchar = q.indexOf('?'),
                    query = {};

                if (qchar !== -1) {
                    var pairs = q.slice(qchar + 1).split('&');
                    angular.forEach(pairs, function(pair) {
                        var kv = pair.split('=');
                        query[kv[0]] = kv[1];
                    });
                }
                return query;
            }

            query = parse();
            if (key) { return query[key]; }
            else { return query;}
        }
    };

}]);