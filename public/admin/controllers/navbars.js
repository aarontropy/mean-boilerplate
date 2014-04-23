'use strict';

angular.module('admin')
.controller('NavBarController', ['$scope', 'auth', function($scope, auth) {
    $scope.me = auth.me();
    $scope.show = function() {
        console.log($scope.me);
    };
}])
.controller('SideBarController', ['$scope', 'auth', function($scope, auth) {
    $scope.sections = {
        news: { open: false }
    };
}]);