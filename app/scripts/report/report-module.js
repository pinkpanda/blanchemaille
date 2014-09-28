angular.module('app.reportModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('reports', {
        abstract: true,
        url: '/compte-rendus',
        template: '<div ui-view></div>'
      })

      .state('reports.index', {
        url: '',
        templateUrl: 'views/report/index.html',
        controller: 'ReportIndexController',
        resolve: {
          reports: ['reportData', function(reportData) {
            return reportData.getIndex();
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('reports');
          }]
        }
      })
  }])
;
