angular.module('app.organizationModule')
  .service(
    'organizationData',
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

          Restangular.all('organizations').getList().then(
            function(data) {
              deferred.resolve(data);
            }
          );

          return deferred.promise;
        };

        this.getOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('organizations', id).get().then(
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
          var deferred  = $q.defer();
          var fd        = new FormData();

          _(['address', 'ceo_bio', 'ceo_name', 'city', 'email', 'image', 'lat', 'link', 'lon', 'name', 'nb_employees', 'phone', 'sector']).each(function(attr) {
            if (model[attr]) {
              fd.append(attr, model[attr]);
            }
          });

          if (typeof model.id !== 'undefined') {
            Restangular.one('organizations', model.id)
              .withHttpConfig({ transformRequest: angular.identity })
              .customPUT(fd, undefined, {}, { 'Content-Type': undefined }).then(
                function(data) {
                  deferred.resolve(data);
                }
              )
            ;
          } else {
            Restangular.all('organizations')
              .withHttpConfig({ transformRequest: angular.identity })
              .post(fd, {}, { 'Content-Type': undefined }).then(
                function(data) {
                  deferred.resolve(data);
                }
              )
            ;
          }

          return deferred.promise;
        };

        this.deleteOne = function(id) {
          var deferred = $q.defer();

          Restangular.one('organizations', id).remove().then(
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
