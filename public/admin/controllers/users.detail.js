'use strict';

angular.module('admin')
.controller('UserDetailController', ['$scope', '$stateParams', '$state', 'api', 
function($scope, $stateParams, $state, api) {
    var id = $stateParams.id;
    var Users = api('admin', 'users');

    $scope.user = {};
    if (id) {
        $scope.user = Users.get({id: id});
    }

    var success = function() {
        console.log("Success");
    };
    var error = function(resp) {
        angular.forEach(resp.data.errors, function(idx, error) {
            console.log(error.message);
        });
    };

    $scope.save = function() {
        if ($scope.user._id) {
            $scope.user.$update(
                function() {
                    $state.go('users');
                }, error);
        } else {
            $scope.user = Users.save($scope.user, 
                function() {
                    $state.go('users');
                }, error);
        }
    };

    // ==== SELECT2 ============================================================
    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
    };

}]);