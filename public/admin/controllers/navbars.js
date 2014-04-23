'use strict';

angular.module('admin')
.controller('NavBarController', ['$scope', 'Auth', function($scope, Auth) {
    $scope.me = Auth.me();
    $scope.show = function() {
        console.log($scope.me);
    };
}])
.controller('SideBarController', ['$scope', 'Auth', function($scope, Auth) {
    $scope.sections = {
        news: { open: false }
    };
}]);