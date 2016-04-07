(function(angular) {
        'use strict';
        angular.module('myApp', ['ui.router'])

        .controller('MainController', function($scope, $route, $routeParams, $location) {
            $scope.$route = $route;
            $scope.$location = $location;
            $scope.$routeParams = $routeParams;
        })

        .config([
                ['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $provide) {
                    $urlRouterProvider.otherwise('/index');

                    // PAGES

                    $stateProvider

                        .state('index', {
                        url: '/index',
                        templateUrl: '../index.html',

                    })

                        .state('email', {
                        url: '/email',
                        templateUrl: '../pages/email.html',
                        controller: 'EmailController'
                    })


                    .state('about', {
                        url: '/about',
                        templateUrl: '../pages/about.html',
                        controller: 'AboutController'
                    })

                    .state('login', {
                        url: '/login',
                        templateUrl: '../pages/login.html',
                        controller: 'LoginController'
                    })

                    .state('signup', {
                        url: '/signup',
                        templateUrl: '../pages/signup.html',
                        controller: 'SignUpController'
                    })

                    .state('search', {
                        url: '/search',
                        templateUrl: '../pages/search.html',
                        controller: 'SearchController'
                    })

                    .state('feedback', {
                        url: '/feedback',
                        templateUrl: '../pages/feedback.html',
                        controller: 'FeedbackController'
                    })

                    .state('feedback', {
                        url: '/map',
                        templateUrl: '../pages/map.html',
                        controller: 'MapController'
                    })

                    .state('tos', {
                        url: '/tos',
                        templateUrl: '../pages/tos.html',
                        controller: 'tosController'
                    })

                   $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    })

                    $provide.decorator('$sniffer', function($delegate) {
                        $delegate.history = false;
                        return $delegate;
                    });

                }]);




    /*
    Copyright 2016 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license
    */
