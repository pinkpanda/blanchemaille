angular.module('app.organizationModule')
  .controller(
    'OrganizationIndexController',
    [
      '$log',
      '$http',
      '$scope',
      '$state',
      'organizationData',
      'organizations',

      function(
        $log,
        $http,
        $scope,
        $state,
        organizationData,
        organizations
      ) {
        $scope.organizations  = organizations;
        $scope.organization   = {};

        $scope.save = function(form) {
          if (form.$valid) {
            organizationData.saveOne($scope.organization).then(
              function(data) {
                $state.transitionTo($state.current, {}, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
              }
            );
          }
        };

        $scope.map = {
          center: {
            latitude: 50.7,
            longitude: 3.1667
          },
          marker: {
            latitude: null,
            longitude: null
          },
          zoom: 11
        };

        $scope.getCoord = function(address) {
          return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: address,
              sensor: false
            }
          });
        };

        $scope.$watchCollection('[organization.address, organization.city]', _.debounce(function(newV, oldV) {
          if (newV[0] && newV[1]) {
            $scope.getCoord(newV.join(', ')).success(function(data) {
              $scope.organization.lat = $scope.map.marker.latitude = data.results[0].geometry.location.lat;
              $scope.organization.lon = $scope.map.marker.longitude = data.results[0].geometry.location.lng;
            });
          }
        }, 1000));
      }
    ]
  )

  .controller(
    'OrganizationShowController',

    [
      '$log',
      '$scope',
      'organizationData',
      'organization',

      function(
        $log,
        $scope,
        organizationData,
        organization
      ) {
        $scope.organization = organization;
      }
    ]
  )

  .controller(
    'OrganizationNewController',

    [
      '$log',
      '$http',
      '$scope',
      '$state',
      'organizationData',

      function(
        $log,
        $http,
        $scope,
        $state,
        organizationData
      ) {
        $scope.organization = {};

        $scope.save = function(form) {
          if (form.$valid) {
            organizationData.saveOne($scope.organization).then(
              function(data) {
                $state.go('admin.organizations.index');
              }
            );
          }
        };

        $scope.map = {
          center: {
            latitude: 50.7,
            longitude: 3.1667
          },
          marker: {
            latitude: null,
            longitude: null
          },
          zoom: 11
        };

        $scope.getCoord = function(address) {
          return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: address,
              sensor: false
            }
          });
        };

        $scope.$watchCollection('[organization.address, organization.city]', _.debounce(function(newV, oldV) {
          if (newV[0] && newV[1]) {
            $scope.getCoord(newV.join(', ')).success(function(data) {
              $scope.organization.lat = $scope.map.marker.latitude = data.results[0].geometry.location.lat;
              $scope.organization.lon = $scope.map.marker.longitude = data.results[0].geometry.location.lng;
            });
          }
        }, 1000));
      }
    ]
  )

  .controller(
    'OrganizationEditController',

    [
      '$log',
      '$http',
      '$scope',
      '$state',
      'organizationData',
      'organization',

      function(
        $log,
        $http,
        $scope,
        $state,
        organizationData,
        organization
      ) {
        $scope.organization = organization;

        $scope.save = function(form) {
          if (form.$valid) {
            organizationData.saveOne($scope.organization).then(
              function(data) {
                $state.go('admin.organizations.index');
              }
            );
          }
        };

        $scope.delete = function() {
          organizationData.deleteOne($scope.organization.id).then(
            function(data) {
              $state.go('admin.organizations.index');
            }
          );
        };

        $scope.map = {
          center: {
            latitude: $scope.organization.lat || 50.7,
            longitude: $scope.organization.lon || 3.1667
          },
          marker: {
            latitude: $scope.organization.lat,
            longitude: $scope.organization.lon
          },
          zoom: 11
        };

        $scope.getCoord = function(address) {
          return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: {
              address: address,
              sensor: false
            }
          });
        };

        $scope.$watchCollection('[organization.address, organization.city]', _.debounce(function(newV, oldV) {
          if (newV[0] && newV[1]) {
            $scope.getCoord(newV.join(', ')).success(function(data) {
              $scope.organization.lat = $scope.map.marker.latitude = data.results[0].geometry.location.lat;
              $scope.organization.lon = $scope.map.marker.longitude = data.results[0].geometry.location.lng;
            });
          }
        }, 1000));
      }
    ]
  )
;
