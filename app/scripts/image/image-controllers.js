angular.module('app.imageModule')
  .controller(
    'ImageIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'images',

      function(
        $log,
        $scope,
        $state,
        images
      ) {
        $scope.images = images;
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
