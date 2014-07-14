angular.module('app.workModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('works', {
        abstract: true,
        url: '/works',
        template: '<div ui-view></div>'
      })

      .state('works.index', {
        url: '',
        templateUrl: 'views/work/index.html',
        controller: 'WorkIndexController',
        resolve: {
          works: ['workData', function(workData) {
            return workData.getIndex();
          }]
        }
      })
  }])
;
