angular.module('app.newspaperModule')
  .controller(
    'NewspaperIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'newspaperData',
      'newspapers',
      'page',

      function(
        $log,
        $scope,
        $state,
        newspaperData,
        newspapers,
        page
      ) {
        $scope.newspapers = newspapers;
        $scope.page       = page;
        $scope.newspaper  = {};

        $scope.save = function(form) {
          if (form.$valid) {
            newspaperData.saveOne($scope.newspaper).then(
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
    'NewspaperShowController',

    [
      '$log',
      '$scope',
      'newspaperData',
      'newspaper',

      function(
        $log,
        $scope,
        newspaperData,
        newspaper
      ) {
        $scope.newspaper = newspaper;
      }
    ]
  )

  .controller(
    'NewspaperNewController',

    [
      '$log',
      '$scope',
      '$state',
      'newspaperData',

      function(
        $log,
        $scope,
        $state,
        newspaperData
      ) {
        $scope.newspaper = {};

        $scope.save = function(form) {
          if (form.$valid) {
            newspaperData.saveOne($scope.newspaper).then(
              function(data) {
                $state.go('admin.newspapers.index');
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'NewspaperEditController',

    [
      '$log',
      '$scope',
      '$state',
      'newspaperData',
      'newspaper',

      function(
        $log,
        $scope,
        $state,
        newspaperData,
        newspaper
      ) {
        $scope.newspaper = newspaper;

        $scope.save = function(form) {
          if (form.$valid) {
            newspaperData.saveOne($scope.newspaper).then(
              function(data) {
                $state.go('admin.newspapers.index');
              }
            );
          }
        };

        $scope.delete = function() {
          newspaperData.deleteOne($scope.newspaper.id).then(
            function(data) {
              $state.go('admin.newspapers.index');
            }
          );
        };
      }
    ]
  )
;
