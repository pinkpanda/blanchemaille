'use strict';

angular.module('app', [
  'restangular',
  'ui.router',
  'ngProgressLite',
  'ui.bootstrap',
  'google-maps',

  'app.module',
  'app.constants',
  'app.directives',

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
      'API_BASE_URL',

      function(
        $stateProvider,
        $urlRouterProvider,
        $locationProvider,
        RestangularProvider,
        API_BASE_URL
      ) {
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

        RestangularProvider.setBaseUrl(API_BASE_URL);
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
          var bodyClass = '', state, tmpState;

          state = toState.name.split('.');

          for (var i = state.length; i > 0; i--) {
            tmpState = state.slice(0, i).join('.');

            if ($state.get(tmpState) && $state.get(tmpState).bodyClass) {
              bodyClass += ' ' + $state.get(tmpState).bodyClass;
            }
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
