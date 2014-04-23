'use strict';

angular.module('admin')
.controller('NavBarController', ['$scope', function($scope) {

}])
.controller('SideBarController', ['$scope', function($scope) {
    $scope.sections = {
        news: { open: false }
    };
}]);