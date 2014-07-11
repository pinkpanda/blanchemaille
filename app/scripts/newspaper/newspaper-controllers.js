angular.module('app.newspaperModule')
  .controller(
    'NewspaperIndexController',
    [
      '$log',
      '$scope',
      'newspapers',

      function(
        $log,
        $scope,
        newspapers
      ) {
        $scope.newspapers = newspapers;
      }
    ]
  )
;
