'use strict';

angular.module('app', [
  'restangular',
  'ui.router',
  'ngProgressLite',
  'ui.bootstrap',

  'app.adminModule',
  'app.newspaperModule',
  'app.organizationModule',
  'app.pageModule',
  'app.partnerModule',
  'app.workModule'
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

        RestangularProvider.setBaseUrl('http://api.blanchemaille.pinkpanda.io');

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
      '$state',
      '$timeout',
      'ngProgressLite',

      function(
        $log,
        $rootScope,
        $state,
        $timeout,
        ngProgressLite
      ) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          ngProgressLite.start();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          var bodyClass, state, tmpState;

          if (!toState.bodyClass) {
            state = toState.name.split('.');

            for (var i = state.length; i > 0; i--) {
              tmpState = state.slice(0, i).join('.');

              if (!bodyClass && $state.get(tmpState) && $state.get(tmpState).bodyClass) {
                bodyClass = $state.get(tmpState).bodyClass;
              }
            }
          } else {
            bodyClass = toState.bodyClass;
          }

          $rootScope.bodyClass = bodyClass;

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
