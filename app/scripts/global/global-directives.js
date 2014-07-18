angular.module('app.directives', [])
  .directive(
    'apiImg',
    [
      '$log',
      '$timeout',
      'API_BASE_URL',

      function(
        $log,
        $timeout,
        API_BASE_URL
      ) {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
            $timeout(function() {
              element.attr('src', API_BASE_URL + element.attr('src'));
            });
          }
        };
      }
    ]
  )
;
