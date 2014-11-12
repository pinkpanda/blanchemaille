angular.module('app.eventModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/evenements',
        template: '<div ui-view></div>'
      })

      .state('events.index', {
        url: '',
        templateUrl: 'views/event/index.html',
        controller: 'EventIndexController',
        resolve: {
          events: ['eventData', function(eventData) {
            return eventData.getIndex();
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('calendar');
          }]
        }
      })

      .state('events.show', {
        url: '/:id',
        templateUrl: 'views/event/show.html',
        controller: 'EventShowController',
        bodyClass: 'light-gray',
        resolve: {
          eventItem: ['$stateParams', 'eventData', function($stateParams, eventData) {
            return eventData.getOne($stateParams.id);
          }]
        }
      })
    ;
  }])
;
