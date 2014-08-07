angular.module('app.module', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: [
          '$log',
          '$scope',
          'about',
          'investment',
          'organizations',
          'page',
          'partners',
          'networks',

          function(
            $log,
            $scope,
            about,
            investment,
            organizations,
            page,
            partners,
            networks
          ) {
            $scope.about          = about;
            $scope.investment     = investment;
            $scope.organizations  = organizations;
            $scope.page           = page;
            $scope.partners       = partners;
            $scope.networks       = networks;
          }
        ],
        resolve: {
          about: ['pageData', function(pageData) {
            return pageData.getOne('about');
          }],

          investment: ['pageData', function(pageData) {
            return pageData.getOne('investment');
          }],

          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('home');
          }],

          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }],

          networks: ['pageData', function(pageData) {
            return pageData.getOne('networks');
          }]
        }
      })

      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        bodyClass: 'white',
        controller: [
          '$log',
          'Restangular',
          '$scope',

          function(
            $log,
            Restangular,
            $scope
          ) {
            $scope.contact = {};

            $scope.send = function(form) {
              if (form.$valid) {
                Restangular.all('contact').post(_.merge($scope.contact, { to: 'contact@pinkpanda.io' })).then(
                  function(data) {
                    $scope.contact = {};
                  }
                );
              }
            }
          }
        ]
      })

      .state('faq', {
        url: '/foire-aux-questions',
        templateUrl: 'views/faq.html',
        bodyClass: 'light-gray',
        controller: [
          '$log',
          '$scope',
          'page',

          function(
            $log,
            $scope,
            page
          ) {
            $scope.page = page;
          }
        ],
        resolve: {
          page: ['pageData', function(pageData) {
            return pageData.getOne('faq');
          }]
        }
      })

      .state('login', {
        url: '/connexion',
        templateUrl: 'views/login.html',
        bodyClass: 'white',
        controller: [
          '$log',
          '$scope',
          '$state',
          'localStorageService',
          'AuthService',

          function(
            $log,
            $scope,
            $state,
            localStorageService,
            AuthService
          ) {
            localStorageService.clearAll();

            $scope.send = function(form) {
              if (form.$valid) {
                AuthService.login($scope.login).then(function() {
                  window.location.href = '/admin';
                });
              }
            }
          }
        ]
      })
  }])
;
