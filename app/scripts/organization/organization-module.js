angular.module('app.organizationModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('organizations', {
        abstract: true,
        url: '/la-communaute',
        template: '<div ui-view></div>'
      })

      .state('organizations.index', {
        url: '',
        templateUrl: 'views/organization/index.html',
        controller: 'OrganizationIndexController',
        resolve: {
          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('organizations');
          }],

          sectors: ['$q', 'Restangular', function($q, Restangular) {
            var deferred = $q.defer();

            Restangular.all('sectors').getList().then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );

            return deferred.promise;
          }],

          iframe: function() { return false; }
        }
      })

      .state('organizations.iframe', {
        url: '/iframe',
        templateUrl: 'views/organization/iframe.html',
        controller: 'OrganizationIndexController',
        resolve: {
          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          page: function() {},

          sectors: ['$q', 'Restangular', function($q, Restangular) {
            var deferred = $q.defer();

            Restangular.all('sectors').getList().then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );

            return deferred.promise;
          }],

          iframe: function() { return true; }
        }
      })

      .state('organizations.show', {
        url: '/:id',
        templateUrl: 'views/organization/show.html',
        controller: 'OrganizationShowController',
        bodyClass: 'light-gray',
        resolve: {
          organization: ['$stateParams', 'organizationData', function($stateParams, organizationData) {
            return organizationData.getOne($stateParams.id);
          }]
        }
      })
    ;
  }])
;
