angular.module('app.newspaperModule')
  .service(
    'newspaperData',
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

          Restangular.all('newspapers').getList().then(
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
          var deferred  = $q.defer();
          var fd        = new FormData();

          _(['content', 'image', 'link', 'newspaper_name', 'title']).each(function(attr) {
            if (model[attr]) {
              fd.append(attr, model[attr]);
            }
          });

          if (typeof model.id !== 'undefined') {
            AuthRestangular.one('newspapers', model.id)
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
            AuthRestangular.all('newspapers')
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

          AuthRestangular.one('newspapers', id).remove().then(
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
