angular.module('app.eventModule')
  .controller(
    'EventIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'events',
      'page',

      function(
        $log,
        $scope,
        $state,
        events,
        page
      ) {
        $scope.events = events;
        $scope.page   = page;

        angular.forEach($scope.events, function(eventItem) {
          eventItem.path = $state.href('events.show', { id: eventItem.slug }, { absolute: true });
        });

        if ($scope.page) {
          $scope.calendar = {
            config: {
              height: 600,
              lang: 'fr',
              header: {
                left: 'month agendaWeek agendaDay',
                right: 'today prev,next'
              }
            },
            source: [{ url: $scope.page.content }]
          };
        }
      }
    ]
  )

  .controller(
    'EventShowController',

    [
      '$log',
      '$scope',
      'eventData',
      'eventItem',

      function(
        $log,
        $scope,
        eventData,
        eventItem
      ) {
        $scope.eventItem = eventItem;
      }
    ]
  )

  .controller(
    'EventNewController',

    [
      '$log',
      '$scope',
      '$state',
      'eventData',

      function(
        $log,
        $scope,
        $state,
        eventData
      ) {
        $scope.eventItem = {};

        $scope.save = function(form) {
          if (form.$valid) {
            eventData.saveOne($scope.eventItem).then(
              function(data) {
                $state.go('admin.events.index');
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'EventEditController',

    [
      '$log',
      '$scope',
      '$state',
      'eventData',
      'eventItem',

      function(
        $log,
        $scope,
        $state,
        eventData,
        eventItem
      ) {
        $scope.eventItem              = eventItem;
        $scope.eventItem.scheduled_at = $scope.eventItem.scheduled_at.substr(0, 10);

        $scope.save = function(form) {
          if (form.$valid) {
            eventData.saveOne($scope.eventItem).then(
              function(data) {
                $state.go('admin.events.index');
              }
            );
          }
        };

        $scope.delete = function() {
          eventData.deleteOne($scope.eventItem.id).then(
            function(data) {
              $state.go('admin.events.index');
            }
          );
        };
      }
    ]
  )
;
