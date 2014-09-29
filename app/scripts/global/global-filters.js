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
    'compareFromNow',
    [
      '$log',

      function(
        $log
      ) {
        return function(input, when) {
          return _.filter(input, function(ev) {
            if (when == 'before') {
              if (moment().isAfter(ev.scheduled_at))
                return true;
            } else {
              if (moment().isBefore(ev.scheduled_at))
                return true;
            }
          });
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
