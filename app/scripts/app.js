'use strict';

angular.module('hakanlanar', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/intro.html',
        controller: 'IntroCtrl'
      })
      .when('/game', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
