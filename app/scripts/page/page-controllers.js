angular.module('app.pageModule')
  .controller(
    'PageIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'pageData',
      'pages',

      function(
        $log,
        $scope,
        $state,
        pageData,
        pages
      ) {
        $scope.pages  = pages;
        $scope.page   = {};

        $scope.save = function(form) {
          if (form.$valid) {
            pageData.saveOne($scope.page).then(
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
    'PageShowController',

    [
      '$log',
      '$scope',
      'pageData',
      'page',

      function(
        $log,
        $scope,
        pageData,
        page
      ) {
        $scope.page = page;
      }
    ]
  )

  .controller(
    'PageNewController',

    [
      '$log',
      '$scope',
      '$state',
      'pageData',

      function(
        $log,
        $scope,
        $state,
        pageData
      ) {
        $scope.page = {};

        $scope.save = function(form) {
          if (form.$valid) {
            pageData.saveOne($scope.page).then(
              function(data) {
                $state.go('admin.pages.index');
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'PageEditController',

    [
      '$log',
      '$scope',
      '$state',
      'pageData',
      'page',

      function(
        $log,
        $scope,
        $state,
        pageData,
        page
      ) {
        $scope.page = page;

        $scope.save = function(form) {
          if (form.$valid) {
            pageData.saveOne($scope.page).then(
              function(data) {
                $state.go('admin.pages.index');
              }
            );
          }
        };

        $scope.delete = function() {
          pageData.deleteOne($scope.page.id).then(
            function(data) {
              $state.go('admin.pages.index');
            }
          );
        };
      }
    ]
  )
;
