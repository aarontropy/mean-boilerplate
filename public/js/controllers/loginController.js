'use strict';

angular.module('site')
.controller('LoginController', ['$scope', '$window', 'auth', 'query', function($scope, $window, auth, query) {
    $scope.credentials = {};
    $scope.errorMessage = '';

    $scope.login = function() {

        var success = function(response) {
            $window.location.href = query.q('redirect') || '/';
        };
        var failure = function(response) {
            $scope.errorMessage = response.error;
            console.log("Error: ", response);
        };

        auth.login($scope.credentials, success, failure);
    };
}]);