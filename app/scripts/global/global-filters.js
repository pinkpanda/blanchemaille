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
        };
      }
    ]
  )

  .filter(
    'filterSelectedMarker',
    [
      '$log',

      function(
        $log
      ) {
        return function(markers, sectors) {
          return markers.filter(function(marker) {
            var r = false;

            angular.forEach(sectors, function(sector) {
              if (marker.sector == sector) {
                r = true;
              }
            });

            return r;
          });
        };
      }
    ]
  )
;
