angular.module('app.pageModule')
  .service(
    'pageData',
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

          Restangular.all('pages').getList().then(
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

          Restangular.one('pages', id).get().then(
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

          if (typeof model.id === 'number') {
            AuthRestangular.one('pages', model.id).customPUT(model).then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );
          } else {
            AuthRestangular.all('pages').post(model).then(
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

          AuthRestangular.one('pages', id).remove().then(
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
