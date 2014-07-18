angular.module('app.partnerModule')
  .controller(
    'PartnerIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'partnerData',
      'partners',

      function(
        $log,
        $scope,
        $state,
        partnerData,
        partners
      ) {
        $scope.partners = partners;
        $scope.partner  = {};

        $scope.save = function(form) {
          if (form.$valid) {
            partnerData.saveOne($scope.partner).then(
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
    'PartnerShowController',

    [
      '$log',
      '$scope',
      'partnerData',
      'partner',

      function(
        $log,
        $scope,
        partnerData,
        partner
      ) {
        $scope.partner = partner;
      }
    ]
  )

  .controller(
    'PartnerNewController',

    [
      '$log',
      '$scope',
      '$state',
      'partnerData',

      function(
        $log,
        $scope,
        $state,
        partnerData
      ) {
        $scope.partner = {};

        $scope.save = function(form) {
          if (form.$valid) {
            partnerData.saveOne($scope.partner).then(
              function(data) {
                $state.go('admin.partners.index');
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'PartnerEditController',

    [
      '$log',
      '$scope',
      '$state',
      'partnerData',
      'partner',

      function(
        $log,
        $scope,
        $state,
        partnerData,
        partner
      ) {
        $scope.partner = partner;

        $scope.save = function(form) {
          if (form.$valid) {
            partnerData.saveOne($scope.partner).then(
              function(data) {
                $state.go('admin.partners.index');
              }
            );
          }
        };

        $scope.delete = function() {
          partnerData.deleteOne($scope.partner.id).then(
            function(data) {
              $state.go('admin.partners.index');
            }
          );
        };
      }
    ]
  )
;
