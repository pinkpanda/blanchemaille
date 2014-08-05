angular.module('app.workModule')
  .service(
    'workData',
    [
      '$log',
      '$q',
      'Restangular',
      'AuthRestangular',

      function(
        $log,
        $q,
        Restangular,
        AuthRestangular
      ) {
        this.getIndex = function() {
          var deferred = $q.defer();

          Restangular.all('works').getList().then(
            function(data) {
              deferred.resolve(data);
            },
            function () {
              deferred.reject();
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
            AuthRestangular.one('works', model.id).customPUT(model).then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );
          } else {
            AuthRestangular.all('works').post(model).then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );
          }

          return deferred.promise;
        };

        this.deleteOne = function(id) {
          var deferred = $q.defer();

          AuthRestangular.one('works', id).remove().then(
            function(data) {
              deferred.resolve(data);
            },
            function () {
              deferred.reject();
            }
          );

          return deferred.promise;
        };
      }
    ]
  )
;
