'use strict';

angular.module('admin', ['site', 'ui.router', 'ui.select2'])
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
    .state('users-detail', {
        url: '/users/:id',
        templateUrl: '/admin/views/users.detail.html',
        controller: 'UserDetailController'
    })
    .state('users-detail-new', {
        url: '/users/new',
        templateUrl: '/adminApp/views/user-detail.html',
        controller: 'UserDetailController'
    })
    ;
}]);