angular.module('app.newspaperModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('newspapers', {
        abstract: true,
        url: '/newspapers',
        template: '<div ui-view></div>'
      })

      .state('newspapers.index', {
        url: '',
        templateUrl: 'views/newspaper/index.html',
        controller: 'NewspaperIndexController',
        resolve: {
          newspapers: ['newspaperData', function(newspaperData) {
            return newspaperData.getIndex();
          }]
        }
      })
  }])
;
