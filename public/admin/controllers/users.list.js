'use strict';

angular.module('site')
.controller('UserListController', ['$scope', '$state', '$window', 'api', 
function($scope, $state, $window, api) {
    var Users = api('admin', 'users');

    $scope.get = function() {
        $scope.users = Users.query();
    };

    $scope.edit = function(user) {
        if (user) {
            $state.go('users-detail', {id: user._id });
        } else {
            $state.go('users-detail-new');
        }
    };

    $scope.delete = function(user) {
        var del = $window.confirm("Delete " + user.name + "?");
        if (del) {
            user.$delete().then(function() {
                $scope.get();
            });
        }
    };

    $scope.get();

}]);