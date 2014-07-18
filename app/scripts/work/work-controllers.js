angular.module('app.workModule')
  .controller(
    'WorkIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'workData',
      'works',

      function(
        $log,
        $scope,
        $state,
        workData,
        works
      ) {
        $scope.works  = works;
        $scope.work   = {};

        $scope.save = function(form) {
          if (form.$valid) {
            workData.saveOne($scope.work).then(
              function(data) {
                $state.transitionTo($state.current, {}, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'WorkShowController',

    [
      '$log',
      '$scope',
      'workData',
      'work',

      function(
        $log,
        $scope,
        workData,
        work
      ) {
        $scope.work = work;
      }
    ]
  )

  .controller(
    'WorkNewController',

    [
      '$log',
      '$scope',
      '$state',
      'workData',

      function(
        $log,
        $scope,
        $state,
        workData
      ) {
        $scope.work = {};

        $scope.save = function(form) {
          if (form.$valid) {
            workData.saveOne($scope.work).then(
              function(data) {
                $state.go('admin.works.index');
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'WorkEditController',

    [
      '$log',
      '$scope',
      '$state',
      'workData',
      'work',

      function(
        $log,
        $scope,
        $state,
        workData,
        work
      ) {
        $scope.work = work;

        $scope.save = function(form) {
          if (form.$valid) {
            workData.saveOne($scope.work).then(
              function(data) {
                $state.go('admin.works.index');
              }
            );
          }
        };

        $scope.delete = function() {
          workData.deleteOne($scope.work.id).then(
            function(data) {
              $state.go('admin.works.index');
            }
          );
        };
      }
    ]
  )
;
