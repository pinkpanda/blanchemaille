angular.module('app.services', [])
  .factory(
    'AuthRestangular',
    [
      '$log',
      'Restangular',
      'AuthService',
      'API_BASE_URL',

      function(
        $log,
        Restangular,
        AuthService,
        API_BASE_URL
      ) {
        return Restangular.withConfig(function(RestangularConfigurer) {
          RestangularConfigurer.setBaseUrl(API_BASE_URL);
          RestangularConfigurer.setDefaultRequestParams({
            authentication_token: AuthService.currentUser().authentication_token
          });
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
    'httpInterceptor',

    [
      '$log',
      '$q',

      function(
        $log,
        $q
      ) {
        return function(promise) {
          var success = function (response) {
            return response;
          };

          var error = function (response) {
            if (response.status === 401) {
              $state.go('login');
            }

            return $q.reject(response);
          };

          return promise.then(success, error);
        };
      }
    ]
  )
;
