angular.module('app.module', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        bodyClass: 'm-home cover',
        controller: [
          '$log',
          '$scope',
          'organizations',
          'partners',

          function(
            $log,
            $scope,
            organizations,
            partners
          ) {
            $scope.organizations  = organizations;
            $scope.partners       = partners;
          }
        ],
        resolve: {
          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }]
        }
      })
  }])
;
