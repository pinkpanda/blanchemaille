angular.module('app.organizationModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('organizations', {
        abstract: true,
        url: '/organizations',
        template: '<div ui-view></div>'
      })

      .state('organizations.index', {
        url: '',
        templateUrl: 'views/organization/index.html',
        controller: 'OrganizationIndexController',
        resolve: {
          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }]
        }
      })
  }])
;
