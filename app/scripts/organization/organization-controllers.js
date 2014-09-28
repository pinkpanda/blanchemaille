angular.module('app.organizationModule')
  .controller(
    'OrganizationIndexController',
    [
      '$log',
      '$http',
      '$scope',
      '$state',
      '$filter',
      'organizations',
      'page',
      'sectors',
      'API_BASE_URL',

      function(
        $log,
        $http,
        $scope,
        $state,
        $filter,
        organizations,
        page,
        sectors,
        API_BASE_URL
      ) {
        $scope.organizations  = organizations;
        $scope.page           = page;
        $scope.sectors        = angular.copy(sectors);
        $scope.selection      = angular.copy(sectors);

        $scope.toggleSelection = function(sector) {
          var idx = $scope.selection.indexOf(sector);

          if (idx > -1) {
            $scope.selection.splice(idx, 1);
          } else {
            $scope.selection.push(sector);
          }

          $scope.filteredMarkers = $filter('filterSelectedMarker')($scope.markers, $scope.selection);
        };

        $scope.toggleSelectionAll = function() {
          if ($scope.selection.length == $scope.sectors.length) {
            $scope.selection.splice(0, $scope.selection.length);
          } else {
            $scope.selection = angular.copy(sectors);
          }

          $scope.filteredMarkers = $filter('filterSelectedMarker')($scope.markers, $scope.selection);
        };

        $scope.markers = _.map($scope.organizations, function(organization, i) {
          i++;

          return {
            id: i,
            latitude: organization.lat,
            longitude: organization.lon,
            name: organization.name,
            path: $state.href('organizations.show', { id: organization.slug }, { absolute: true }),
            sector: organization.sector,
            onClick: function() {
              organization.showWindow = true;
            },
            closeClick: function() {
              organization.showWindow = false;
            }
          };
        });

        $scope.filteredMarkers = $filter('filterSelectedMarker')($scope.markers, $scope.selection);

        $scope.map = {
          center: {
            latitude: 50.690987,
            longitude: 3.174044
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
          options: {
            scrollwheel: false
          },
          zoom: 13
        };
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
            latitude: $scope.organization.lat || 50.690987,
            longitude: $scope.organization.lon || 3.174044
          },
          marker: {
            latitude: $scope.organization.lat,
            longitude: $scope.organization.lon
          },
          options: {
            scrollwheel: false
          },
          zoom: 13
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
            latitude: 50.690987,
            longitude: 3.174044
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
          zoom: 13
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
            latitude: $scope.organization.lat || 50.690987,
            longitude: $scope.organization.lon || 3.174044
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
          zoom: 13
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
