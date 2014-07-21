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
          'about',
          'organizations',
          'page',
          'partners',

          function(
            $log,
            $scope,
            about,
            organizations,
            page,
            partners
          ) {
            $scope.about          = about;
            $scope.organizations  = organizations;
            $scope.page           = page;
            $scope.partners       = partners;
          }
        ],
        resolve: {
          about: ['pageData', function(pageData) {
            return pageData.getOne('about');
          }],

          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('home');
          }],

          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }]
        }
      })
  }])
;
