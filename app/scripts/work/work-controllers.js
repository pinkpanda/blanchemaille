angular.module('app.workModule')
  .controller(
    'WorkIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'works',
      'page',

      function(
        $log,
        $scope,
        $state,
        works,
        page
      ) {
        $scope.works  = works;
        $scope.page   = page;
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
        $scope.work           = work;
        $scope.work.worked_at = $scope.work.worked_at.substr(0, 10);

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
