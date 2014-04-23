'use strict';

angular.module('admin', ['site', 'ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Unmatched Urls
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '/admin/views/dashboard.html',
        controller: 'HomeController'
    })
    .state('users', {
        url: '/users',
        templateUrl: '/admin/views/users.list.html',
        controller: 'UserListController'
    })
    ;
}]);