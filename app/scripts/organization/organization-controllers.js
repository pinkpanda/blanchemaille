angular.module('app.organizationModule')
  .controller(
    'OrganizationIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'organizationData',
      'organizations',

      function(
        $log,
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
      '$scope',
      '$state',
      'organizationData',

      function(
        $log,
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
      }
    ]
  )

  .controller(
    'OrganizationEditController',

    [
      '$log',
      '$scope',
      '$state',
      'organizationData',
      'organization',

      function(
        $log,
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
      }
    ]
  )
;
