var app = angular.module('myApp', ['ngRoute', 'ngAnimate'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/log', {
                templateUrl: 'log-view.html',
                controller: 'logController'
            })
            .when('/add-type', {
                templateUrl: 'add-type-view.html',
                controller: 'addTypeController'
            })
            .when('/add-app', {
                templateUrl: 'add-app-view.html',
                controller: 'addAppController'
            })
            .when('/add-channel', {
                templateUrl: 'add-channel-view.html',
                controller: 'addChannelController'
            })
            .when('/add-ad', {
                templateUrl: 'add-ad-view.html',
                controller: 'addAdController'
            })
            .when('/add-bind', {
                templateUrl: 'add-bind-view.html',
                controller: 'addBindController'
            })
            .when('/data-type', {
                templateUrl: "data-type-view.html",
                controller: "dataTypeController"
            })
            .when('/app-details', {
                templateUrl: 'app-details-view.html',
                controller: 'appDetailsController'
            })
            .when('/daily', {
                templateUrl: 'daily-view.html',
                controller: 'dailyController'
            })
            .when('/pandect', {
                templateUrl: 'pandect-view.html',
                controller: 'pandectController'
            })
            .when('/bind-particalars', {
                templateUrl: 'bind-particalars-view.html',
                controller: 'bindParticalarsController'
            })
            .when('/ad-particalars', {
                templateUrl: "ad-particalars-view.html",
                controller: 'adParticalarsController'
            })
            .when('/ad-manage', {
                templateUrl: 'ad-manage-view.html',
                controller: 'adManageController'
            })
    });