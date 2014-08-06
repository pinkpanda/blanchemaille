angular.module('app.eventModule')
  .service(
    'eventData',
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

          Restangular.all('events').getList().then(
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

          Restangular.one('events', id).get().then(
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
            AuthRestangular.one('events', model.id).customPUT(model).then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );
          } else {
            AuthRestangular.all('events').post(model).then(
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

          AuthRestangular.one('events', id).remove().then(
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
