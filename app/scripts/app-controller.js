angular.module('app')
  .controller(
    'AppController',
    [
      '$log',
      '$scope',
      'AuthService',

      function(
        $log,
        $scope,
        AuthService
      ) {
        $scope.$watch(AuthService.isLoggedIn, function(isLoggedIn) {
          $scope.isLoggedIn = isLoggedIn;

          AuthService.currentUser().then(
            function(data) {
              $scope.currentUser = data;
            }
          );
        });
      }
    ]
  )
;
