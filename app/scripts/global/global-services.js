angular.module('app.services', [])
  .factory(
    'AuthRestangular',
    [
      '$log',
      '$state',
      'Restangular',
      'AuthService',
      'API_BASE_URL',

      function(
        $log,
        $state,
        Restangular,
        AuthService,
        API_BASE_URL
      ) {
        return Restangular.withConfig(function(RestangularConfigurer) {
          RestangularConfigurer.setBaseUrl(API_BASE_URL);

          AuthService.currentUser().then(
            function(data) {
              RestangularConfigurer.setDefaultRequestParams({
                authentication_token: data.authentication_token
              });
            }
          );
        });
      }
    ]
  )

  .factory(
    'AuthService',
    [
      '$log',
      '$q',
      '$state',
      '$location',
      'localStorageService',
      'Restangular',
      'API_BASE_URL',

      function(
        $log,
        $q,
        $state,
        $location,
        localStorageService,
        Restangular,
        API_BASE_URL
      ) {
        return {
          currentUser: function() {
            var deferred = $q.defer();

            if (localStorageService.get('user')) {
              deferred.resolve(localStorageService.get('user'));
            } else {
              deferred.reject();
            }

            return deferred.promise;
          },
          isLoggedIn: function() {
            if (localStorageService.get('user')) {
              return true;
            } else {
              return false;
            }
          },
          login: function(model) {
            var deferred = $q.defer();

            Restangular.all('token').post(model).then(
              function(data) {
                localStorageService.set('user', data);
                deferred.resolve(data);
              },
              function() {
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        };
      }
    ]
  )

  .factory(
    'errorHttpInterceptor',

    [
      '$log',
      '$q',
      '$rootScope',

      function(
        $log,
        $q,
        $rootScope
      ) {
        return function(promise) {
          var success = function (response) {
            return response;
          };

          var error = function (response) {
            var message = '';

            $log.info(response);

            switch (response.status) {
              case 400:
                message = 'not_created';
                break;

              case 401:
                message = 'not_authorized';
                break;

              case 404:
                message = 'not_found';
                break;
            }

            $rootScope.$broadcast(message);

            return $q.reject(response);
          };

          return promise.then(success, error);
        };
      }
    ]
  )
;
