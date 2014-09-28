angular.module('app.reportModule')
  .controller(
    'ReportIndexController',
    [
      '$log',
      '$scope',
      '$state',
      'reports',
      'page',

      function(
        $log,
        $scope,
        $state,
        reports,
        page
      ) {
        $scope.reports  = reports;
        $scope.page     = page;
      }
    ]
  )

  .controller(
    'ReportNewController',

    [
      '$log',
      '$scope',
      '$state',
      'reportData',

      function(
        $log,
        $scope,
        $state,
        reportData
      ) {
        $scope.report = {};

        $scope.save = function(form) {
          if (form.$valid) {
            reportData.saveOne($scope.report).then(
              function(data) {
                $state.go('admin.reports.index');
              }
            );
          }
        };
      }
    ]
  )

  .controller(
    'ReportEditController',

    [
      '$log',
      '$scope',
      '$state',
      'reportData',
      'report',

      function(
        $log,
        $scope,
        $state,
        reportData,
        report
      ) {
        $scope.report = report;

        $scope.save = function(form) {
          if (form.$valid) {
            reportData.saveOne($scope.report).then(
              function(data) {
                $state.go('admin.reports.index');
              }
            );
          }
        };

        $scope.delete = function() {
          reportData.deleteOne($scope.report.id).then(
            function(data) {
              $state.go('admin.reports.index');
            }
          );
        };
      }
    ]
  )
;
