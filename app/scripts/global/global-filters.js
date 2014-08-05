angular.module('app.filters', [])
  .filter(
    'stripHtml',
    [
      '$log',

      function(
        $log
      ) {
        return function(text) {
          return String(text).replace(/<[^>]+>/gm, '');
        }
      }
    ]
  )
;
