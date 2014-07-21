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
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('newspapers');
          }]
        }
      })

      .state('newspapers.show', {
        url: '/:id',
        templateUrl: 'views/newspaper/show.html',
        controller: 'NewspaperShowController',
        resolve: {
          newspaper: ['$stateParams', 'newspaperData', function($stateParams, newspaperData) {
            return newspaperData.getOne($stateParams.id);
          }]
        }
      })
  }])
;
