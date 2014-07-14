angular.module('app.partnerModule')
  .service(
    'partnerData',
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

          Restangular.all('partners').getList().then(
            function(data) {
              deferred.resolve(data);
            }
          );

          return deferred.promise;
        };

        this.getOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('partners', id).get().then(
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
            Restangular.one('partners', model.id).put(model).then(
              function(data) {
                deferred.resolve(data);
              }
            );
          } else {
            Restangular.all('partners').post(model).then(
              function(data) {
                deferred.resolve(data);
              }
            );
          }

          return deferred.promise;
        };

        this.deleteOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('partners', id).remove().then(
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
