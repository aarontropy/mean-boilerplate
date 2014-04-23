'use strict';

angular.module('site')
.factory('api', ['$resource', function($resource) {
    return function(api, resource) {
        var url = '/' + api + '/api/' + resource + '/:id';
        return $resource(url,
            {id: '@_id'},
            {
                update: {method: 'PUT'}
            }
        );
    };
}]);