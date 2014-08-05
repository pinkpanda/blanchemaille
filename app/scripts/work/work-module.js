angular.module('app.workModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('works', {
        abstract: true,
        url: '/work-in-progress',
        template: '<div ui-view></div>'
      })

      .state('works.index', {
        url: '',
        templateUrl: 'views/work/index.html',
        controller: 'WorkIndexController',
        resolve: {
          page: ['pageData', function(pageData) {
            return pageData.getOne('works');
          }],

          works: ['workData', function(workData) {
            return workData.getIndex();
          }]
        }
      })
  }])
;
