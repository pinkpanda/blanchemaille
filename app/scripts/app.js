'use strict';

angular.module('app', [
  'restangular',
  'ui.router',
  'ngProgressLite'
])
  .config(
    [
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      'RestangularProvider',

      function(
        $stateProvider,
        $urlRouterProvider,
        $locationProvider,
        RestangularProvider
      ) {
        $urlRouterProvider.otherwise('/');

        RestangularProvider.setBaseUrl('');

        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'views/home.html'
          })
        ;
      }
    ]
  )

  .run(
    [
      '$log',
      '$rootScope',
      '$timeout',
      'ngProgressLite',

      function(
        $log,
        $rootScope,
        $timeout,
        ngProgressLite
      ) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          ngProgressLite.start();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          ngProgressLite.set(0.7);
          $timeout(function () {
            ngProgressLite.done();
          }, 400);
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
          ngProgressLite.done();
        });
      }
    ]
  )
;
