'use strict';

angular.module('site')
.controller('LoginController', ['$scope', '$window', 'Auth', 'Query', function($scope, $window, Auth, Query) {
    $scope.credentials = {};
    $scope.errorMessage = '';

    $scope.login = function() {

        Auth.login($scope.credentials)
        .success(function(data, status, headers, config) {
            $window.location.href = Query.q('redirect') || '/';
        })
        .error(function(data, status, headers, config) {
            console.log("status: ", status);
            console.log("data: ", data);
            console.log("headers: ", headers);
            console.log("config: ", config);
            $scope.errorMessage = data;
            console.log($scope.errorMessage);
        });
    };
}]);