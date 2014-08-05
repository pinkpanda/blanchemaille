'use strict';

angular.module('app', [
  'ngAnimate',
  'LocalStorageModule',
  'restangular',
  'ui.router',
  'ngProgressLite',
  'ui.calendar',
  'google-maps',
  'truncate',
  'textAngular',
  'countTo',
  'duScroll',

  'app.module',
  'app.constants',
  'app.filters',
  'app.directives',
  'app.services',

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
      '$httpProvider',
      '$urlRouterProvider',
      '$locationProvider',
      'localStorageServiceProvider',
      'RestangularProvider',
      'API_BASE_URL',

      function(
        $stateProvider,
        $httpProvider,
        $urlRouterProvider,
        $locationProvider,
        localStorageServiceProvider,
        RestangularProvider,
        API_BASE_URL
      ) {
        $urlRouterProvider.otherwise('/');
        $httpProvider.responseInterceptors.push('errorHttpInterceptor');

        $locationProvider.html5Mode(true);

        localStorageServiceProvider.setPrefix('blanchemaille');

        RestangularProvider.setBaseUrl(API_BASE_URL);
      }
    ]
  )

  .run(
    [
      '$log',
      '$rootScope',
      '$state',
      '$window',
      '$timeout',
      'AuthService',
      'ngProgressLite',

      function(
        $log,
        $rootScope,
        $state,
        $window,
        $timeout,
        AuthService,
        ngProgressLite
      ) {
        $rootScope.$on('not_authorized', function() {
          $state.go('login');
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          var state, tmpState;

          state = toState.name.split('.');

          for (var i = state.length; i > 0; i--) {
            tmpState = state.slice(0, i).join('.');

            if ($state.get(tmpState) && $state.get(tmpState).logged) {
              if (!AuthService.isLoggedIn()) {
                event.preventDefault();
                $state.go('login');
              }
            }
          }

          ngProgressLite.start();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          var bodyClass = '', state, tmpState;

          state = toState.name.split('.');

          for (var i = state.length; i > 0; i--) {
            tmpState = state.slice(0, i).join('.');

            if ($state.get(tmpState)) {
              $timeout(function() {
                if ($('#nav .' + tmpState).length > 0) {
                  $('#nav .' + tmpState).addClass('active');
                }
              }, 100);

              if ($state.get(tmpState).bodyClass)
                bodyClass += ' ' + $state.get(tmpState).bodyClass;
            }
          }

          $rootScope.bodyClass = bodyClass;

          $window.scrollTo(0, 0);

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
