'use strict';

angular.module('admin', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Unmatched Urls
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '/admin/views/dashboard.html',
        controller: 'HomeController'
    })
    ;
}]);