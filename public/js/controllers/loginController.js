'use strict';

angular.module('site')
.controller('LoginController', ['$scope', '$window', 'Auth', 'Query', function($scope, $window, Auth, Query) {
    $scope.credentials = {};
    $scope.errorMessage = '';

    $scope.login = function() {

        var success = function(response) {
            $window.location.href = Query.q('redirect') || '/';
        };
        var failure = function(response) {
            $scope.errorMessage = response.error;
            console.log("Error: ", response);
        };

        Auth.login($scope.credentials, success, failure);
    };
}]);