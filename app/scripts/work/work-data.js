angular.module('app.workModule')
  .service(
    'workData',
    [
      '$log',
      '$q',
      'Restangular',

      function(
        $log,
        $q,
        Restangular
      ) {
        this.getIndex = function() {
          var deferred = $q.defer();

          Restangular.all('works').getList().then(
            function(data) {
              deferred.resolve(data);
            }
          );

          return deferred.promise;
        };

        this.getOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('works', id).get().then(
            function(data) {
              deferred.resolve(data);
            },
            function () {
              deferred.reject();
            }
          );

          return deferred.promise;
        };

        this.saveOne = function(model) {
          var deferred = $q.defer();

          if (typeof model.id !== 'undefined') {
            Restangular.one('works', model.id).customPUT(model).then(
              function(data) {
                deferred.resolve(data);
              }
            );
          } else {
            Restangular.all('works').post(model).then(
              function(data) {
                deferred.resolve(data);
              }
            );
          }

          return deferred.promise;
        };

        this.deleteOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('works', id).remove().then(
            function(data) {
              deferred.resolve(data);
            }
          );

          return deferred.promise;
        };
      }
    ]
  )
;
