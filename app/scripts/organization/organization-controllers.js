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
      'page',
      'sectors',

      function(
        $log,
        $http,
        $scope,
        $state,
        organizationData,
        organizations,
        page,
        sectors
      ) {
        $scope.organizations  = organizations;
        $scope.page           = page;
        $scope.organization   = {};
        $scope.sectors        = sectors;

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
            longitude: null,
            events: {
              position_changed: function() {
                $scope.map.center.latitude  = $scope.map.marker.latitude;
                $scope.map.center.longitude = $scope.map.marker.longitude;
              }
            }
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
      'sectors',

      function(
        $log,
        $http,
        $scope,
        $state,
        organizationData,
        sectors
      ) {
        $scope.organization = {};
        $scope.sectors      = sectors;

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
            longitude: null,
            events: {
              position_changed: function() {
                $scope.map.center.latitude  = $scope.map.marker.latitude;
                $scope.map.center.longitude = $scope.map.marker.longitude;
              }
            }
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
      'sectors',

      function(
        $log,
        $http,
        $scope,
        $state,
        organizationData,
        organization,
        sectors
      ) {
        $scope.organization = organization;
        $scope.sectors      = sectors;

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
            longitude: $scope.organization.lon,
            events: {
              position_changed: function() {
                $scope.map.center.latitude  = $scope.map.marker.latitude;
                $scope.map.center.longitude = $scope.map.marker.longitude;
              }
            }
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
