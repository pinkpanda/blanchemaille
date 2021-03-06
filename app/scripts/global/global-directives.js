angular.module('app.directives', [])
  .directive(
    'apiPath',
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
              if (element.attr('src')) {
                element.attr('src', API_BASE_URL + element.attr('src'));
              } else if (element.attr('href')) {
                element.attr('href', API_BASE_URL + element.attr('href'));
              } else {
                element.attr('value', API_BASE_URL + element.attr('value'));
              }
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
              element.html(element.html().replace(rgxp, '<span class="blanchemaille">Blanchemaille</span>'));
            });
          }
        };
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
        };
      }
    ]
  )
;
