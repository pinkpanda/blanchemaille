angular.module('app.partnerModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('partners', {
        abstract: true,
        url: '/nos-partenaires',
        template: '<div ui-view></div>'
      })

      .state('partners.index', {
        url: '',
        templateUrl: 'views/partner/index.html',
        controller: 'PartnerIndexController',
        resolve: {
          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('partners');
          }]
        }
      })

      .state('partners.show', {
        url: '/:id',
        templateUrl: 'views/partner/show.html',
        controller: 'PartnerShowController',
        bodyClass: 'light-gray',
        resolve: {
          partner: ['$stateParams', 'partnerData', function($stateParams, partnerData) {
            return partnerData.getOne($stateParams.id);
          }]
        }
      })
  }])
;
