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

  .directive(
    'blanchemaille',
    [
      '$log',
      '$timeout',

      function(
        $log,
        $timeout
      ) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            $timeout(function() {
              var rgxp = new RegExp('bl@nchemaille|blanchemaille', 'i');
              element.html(element.html().replace(rgxp, '<span class="blanchemaille">Bl@nchemaille</span>'));
            });
          }
        }
      }
    ]
  )

  .directive(
    'ngReallyClick',
    [
      '$log',

      function(
        $log
      ) {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            element.bind('click', function() {
              var message = attrs.ngReallyMessage;
              if (message && confirm(message)) {
                scope.$apply(attrs.ngReallyClick);
              }
            });
          }
        }
      }
    ]
  )
;
