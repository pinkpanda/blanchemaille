angular.module('app.newspaperModule')
  .service(
    'newspaperData',
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

          Restangular.all('newspapers').getList().then(
            function(data) {
              deferred.resolve(data);
            }
          );

          return deferred.promise;
        };

        this.getOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('newspapers', id).get().then(
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
            Restangular.one('newspapers', model.id).customPUT(model).then(
              function(data) {
                deferred.resolve(data);
              }
            );
          } else {
            Restangular.all('newspapers').post(model).then(
              function(data) {
                deferred.resolve(data);
              }
            );
          }

          return deferred.promise;
        };

        this.deleteOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('newspapers', id).remove().then(
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
