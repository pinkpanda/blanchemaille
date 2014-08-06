angular.module('app.imageModule')
  .controller(
    'ImageIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'imageData',
      'images',

      function(
        $log,
        $scope,
        $state,
        imageData,
        images
      ) {
        $scope.images = images;
        $scope.image  = {};

        $scope.save = function(form) {
          if (form.$valid) {
            imageData.saveOne($scope.image).then(
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
    'ImageNewController',

    [
      '$log',
      '$scope',
      '$state',
      'imageData',

      function(
        $log,
        $scope,
        $state,
        imageData
      ) {
        $scope.image = {};

        $scope.save = function(form) {
          if (form.$valid) {
            imageData.saveOne($scope.image).then(
              function(data) {
                $state.go('admin.images.index');
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'ImageEditController',

    [
      '$log',
      '$scope',
      '$state',
      'imageData',
      'image',

      function(
        $log,
        $scope,
        $state,
        imageData,
        image
      ) {
        $scope.image = image;

        $scope.save = function(form) {
          if (form.$valid) {
            imageData.saveOne($scope.image).then(
              function(data) {
                $state.go('admin.images.index');
              }
            );
          }
        };

        $scope.delete = function() {
          imageData.deleteOne($scope.image.id).then(
            function(data) {
              $state.go('admin.images.index');
            }
          );
        };
      }
    ]
  )
;
