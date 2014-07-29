angular.module('app.module', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: [
          '$log',
          '$scope',
          'about',
          'organizations',
          'page',
          'partners',

          function(
            $log,
            $scope,
            about,
            organizations,
            page,
            partners
          ) {
            $scope.about          = about;
            $scope.organizations  = organizations;
            $scope.page           = page;
            $scope.partners       = partners;
          }
        ],
        resolve: {
          about: ['pageData', function(pageData) {
            return pageData.getOne('about');
          }],

          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          page: ['pageData', function(pageData) {
            return pageData.getOne('home');
          }],

          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }]
        }
      })

      .state('calendar', {
        url: '/evenements',
        templateUrl: 'views/calendar.html',
        bodyClass: 'white',
        controller: [
          '$log',
          '$scope',
          '$filter',
          'page',

          function(
            $log,
            $scope,
            $filter,
            page
          ) {
            $scope.page = page;

            $scope.calendar = {
              config: {
                height: 600,
                header: {
                  left: 'month agendaWeek agendaDay',
                  right: 'today prev,next'
                }
              },
              source: [{ url: $filter('stripHtml')($scope.page.content) }]
            }
          }
        ],
        resolve: {
          page: ['pageData', function(pageData) {
            return pageData.getOne('calendar');
          }]
        }
      })

      .state('contact', {
        url: '/contact',
        templateUrl: 'views/contact.html',
        bodyClass: 'white',
        controller: [
          '$log',
          'Restangular',
          '$scope',

          function(
            $log,
            Restangular,
            $scope
          ) {
            $scope.contact = {};

            $scope.send = function(form) {
              if (form.$valid) {
                Restangular.all('contact').post(_.merge($scope.contact, { to: 'contact@pinkpanda.io' })).then(
                  function(data) {
                    $scope.contact = {};
                  }
                );
              }
            }
          }
        ]
      })

      .state('faq', {
        url: '/foire-aux-questions',
        templateUrl: 'views/faq.html',
        bodyClass: 'light-gray',
        controller: [
          '$log',
          '$scope',
          'page',

          function(
            $log,
            $scope,
            page
          ) {
            $scope.page = page;
          }
        ],
        resolve: {
          page: ['pageData', function(pageData) {
            return pageData.getOne('faq');
          }]
        }
      })
  }])
;
