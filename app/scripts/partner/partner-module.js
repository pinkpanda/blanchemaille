angular.module('app.partnerModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('partners', {
        abstract: true,
        url: '/partners',
        template: '<div ui-view></div>'
      })

      .state('partners.index', {
        url: '',
        templateUrl: 'views/partner/index.html',
        controller: 'PartnerIndexController',
        resolve: {
          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }]
        }
      })
  }])
;
