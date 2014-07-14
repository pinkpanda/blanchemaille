angular.module('app.pageModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        template: '<div ui-view></div>'
      })

      .state('pages.index', {
        url: '',
        templateUrl: 'views/page/index.html',
        controller: 'PageIndexController',
        resolve: {
          pages: ['pageData', function(pageData) {
            return pageData.getIndex();
          }]
        }
      })
  }])
;
