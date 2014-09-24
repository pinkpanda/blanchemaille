angular.module('app.reportModule')
  .service(
    'reportData',
    [
      '$log',
      '$q',
      '$http',
      'Restangular',
      'AuthRestangular',

      function(
        $log,
        $q,
        $http,
        Restangular,
        AuthRestangular
      ) {
        this.getIndex = function() {
          var deferred = $q.defer();

          Restangular.all('reports').getList().then(
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

          Restangular.one('reports', id).get().then(
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

          _(['file', 'title']).each(function(attr) {
            if (model[attr]) {
              fd.append(attr, model[attr]);
            }
          });

          if (typeof model.id !== 'undefined') {
            AuthRestangular.one('reports', model.id)
              .withHttpConfig({ transformRequest: angular.identity })
              .customPUT(fd, undefined, {}, { 'Content-Type': undefined }).then(
                function(data) {
                  deferred.resolve(data);
                },
                function () {
                  deferred.reject();
                }
              )
            ;
          } else {
            AuthRestangular.all('reports')
              .withHttpConfig({ transformRequest: angular.identity })
              .post(fd, {}, { 'Content-Type': undefined }).then(
                function(data) {
                  deferred.resolve(data);
                },
                function () {
                  deferred.reject();
                }
              )
            ;
          }

          return deferred.promise;
        };

        this.deleteOne = function(id) {
          var deferred = $q.defer();

          AuthRestangular.one('reports', id).remove().then(
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
