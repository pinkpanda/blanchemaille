angular.module('app.newspaperModule')
  .service(
    'newspaperData',
    [
      '$log',
      '$q',
      '$http',
      'Restangular',

      function(
        $log,
        $q,
        $http,
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
            Restangular.one('newspapers', model.id).put(model).then(
              function(data) {
                deferred.resolve(data);
              }
            );
          } else {
            var fd = new FormData();
            fd.append('title', model.title);
            fd.append('image', model.image);
            fd.append('newspaper_name', model.newspaper_name);

            // Restangular.all('newspapers').post(fd).then(
            //   function(data) {
            //     deferred.resolve(data);
            //   }
            // );

            $http.post('http://api.blanchemaille.pinkpanda.io/newspapers', fd, {
              transformRequest: angular.identity,
              headers: { 'Content-Type': undefined }
            }).success(function(data) {
              deferred.resolve(data);
            });
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
