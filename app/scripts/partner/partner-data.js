angular.module('app.partnerModule')
  .service(
    'partnerData',
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

          Restangular.all('partners').getList().then(
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
          var deferred  = $q.defer();
          var fd        = new FormData();

          _(['description', 'image', 'link', 'name']).each(function(attr) {
            if (model[attr]) {
              fd.append(attr, model[attr]);
            }
          });

          if (typeof model.id !== 'undefined') {
            AuthRestangular.one('partners', model.id)
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
            AuthRestangular.all('partners')
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

          AuthRestangular.one('partners', id).remove().then(
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
