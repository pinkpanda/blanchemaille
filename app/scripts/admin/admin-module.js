angular.module('app.adminModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'views/admin/home.html',
        bodyClass: 'white l-admin',
        logged: true
      })

      .state('admin.index', {
        url: '',
        templateUrl: 'views/admin/dashboard.html',
        bodyClass: 'dashboard',
        controller: [
          '$log',
          '$scope',
          '$state',
          'events',
          'newspapers',
          'organizations',
          'pages',
          'partners',
          'works',

          function(
            $log,
            $scope,
            $state,
            events,
            newspapers,
            organizations,
            pages,
            partners,
            works
          ) {
            $scope.events         = events;
            $scope.newspapers     = newspapers;
            $scope.organizations  = organizations;
            $scope.pages          = pages;
            $scope.partners       = partners;
            $scope.works          = works;

            angular.forEach($scope.events, function(eventItem) {
              eventItem.path = $state.href('events.show', { id: eventItem.slug }, { absolute: true });
            });
          }
        ],
        resolve: {
          events: ['eventData', function(eventData) {
            return eventData.getIndex();
          }],

          images: ['imageData', function(imageData) {
            return imageData.getIndex();
          }],

          newspapers: ['newspaperData', function(newspaperData) {
            return newspaperData.getIndex();
          }],

          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          pages: ['pageData', function(pageData) {
            return pageData.getIndex();
          }],

          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }],

          works: ['workData', function(workData) {
            return workData.getIndex();
          }]
        }
      })


      .state('admin.events', {
        abstract: true,
        url: '/events',
        template: '<div ui-view></div>',
        bodyClass: 'events'
      })

      .state('admin.events.index', {
        url: '',
        templateUrl: 'views/admin/event/index.html',
        controller: 'EventIndexController',
        resolve: {
          events: ['eventData', function(eventData) {
            return eventData.getIndex();
          }],

          page: function() {}
        }
      })

      .state('admin.events.new', {
        url: '/new',
        templateUrl: 'views/admin/event/edit.html',
        bodyClass: 'new',
        controller: 'EventNewController'
      })

      .state('admin.events.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/event/edit.html',
        controller: 'EventEditController',
        resolve: {
          eventItem: ['$stateParams', 'eventData', function($stateParams, eventData) {
            return eventData.getOne($stateParams.id);
          }]
        }
      })


      .state('admin.images', {
        abstract: true,
        url: '/images',
        template: '<div ui-view></div>',
        bodyClass: 'images'
      })

      .state('admin.images.index', {
        url: '',
        templateUrl: 'views/admin/image/index.html',
        controller: 'ImageIndexController',
        resolve: {
          images: ['imageData', function(imageData) {
            return imageData.getIndex();
          }],

          page: function() {}
        }
      })

      .state('admin.images.new', {
        url: '/new',
        templateUrl: 'views/admin/image/edit.html',
        bodyClass: 'new',
        controller: 'ImageNewController'
      })

      .state('admin.images.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/image/edit.html',
        controller: 'ImageEditController',
        resolve: {
          image: ['$stateParams', 'imageData', function($stateParams, imageData) {
            return imageData.getOne($stateParams.id);
          }]
        }
      })


      .state('admin.newspapers', {
        abstract: true,
        url: '/newspapers',
        template: '<div ui-view></div>',
        bodyClass: 'newspapers'
      })

      .state('admin.newspapers.index', {
        url: '',
        templateUrl: 'views/admin/newspaper/index.html',
        controller: 'NewspaperIndexController',
        resolve: {
          newspapers: ['newspaperData', function(newspaperData) {
            return newspaperData.getIndex();
          }],

          page: function() {}
        }
      })

      .state('admin.newspapers.new', {
        url: '/new',
        templateUrl: 'views/admin/newspaper/edit.html',
        bodyClass: 'new',
        controller: 'NewspaperNewController'
      })

      .state('admin.newspapers.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/newspaper/edit.html',
        controller: 'NewspaperEditController',
        resolve: {
          newspaper: ['$stateParams', 'newspaperData', function($stateParams, newspaperData) {
            return newspaperData.getOne($stateParams.id);
          }]
        }
      })


      .state('admin.organizations', {
        abstract: true,
        url: '/organizations',
        template: '<div ui-view></div>',
        bodyClass: 'organizations'
      })

      .state('admin.organizations.index', {
        url: '',
        templateUrl: 'views/admin/organization/index.html',
        controller: 'OrganizationIndexController',
        resolve: {
          organizations: ['organizationData', function(organizationData) {
            return organizationData.getIndex();
          }],

          page: function() {},

          sectors: ['$q', 'Restangular', function($q, Restangular) {
            var deferred = $q.defer();

            Restangular.all('sectors').getList().then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );

            return deferred.promise;
          }]
        }
      })

      .state('admin.organizations.new', {
        url: '/new',
        templateUrl: 'views/admin/organization/edit.html',
        bodyClass: 'new',
        controller: 'OrganizationNewController',
        resolve: {
          sectors: ['$q', 'Restangular', function($q, Restangular) {
            var deferred = $q.defer();

            Restangular.all('sectors').getList().then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );

            return deferred.promise;
          }]
        }
      })

      .state('admin.organizations.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/organization/edit.html',
        controller: 'OrganizationEditController',
        resolve: {
          organization: ['$stateParams', 'organizationData', function($stateParams, organizationData) {
            return organizationData.getOne($stateParams.id);
          }],

          sectors: ['$q', 'Restangular', function($q, Restangular) {
            var deferred = $q.defer();

            Restangular.all('sectors').getList().then(
              function(data) {
                deferred.resolve(data);
              },
              function () {
                deferred.reject();
              }
            );

            return deferred.promise;
          }]
        }
      })


      .state('admin.pages', {
        abstract: true,
        url: '/pages',
        template: '<div ui-view></div>',
        bodyClass: 'pages'
      })

      .state('admin.pages.index', {
        url: '',
        templateUrl: 'views/admin/page/index.html',
        controller: 'PageIndexController',
        resolve: {
          pages: ['pageData', function(pageData) {
            return pageData.getIndex();
          }]
        }
      })

      .state('admin.pages.new', {
        url: '/new',
        templateUrl: 'views/admin/page/edit.html',
        bodyClass: 'new',
        controller: 'PageNewController'
      })

      .state('admin.pages.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/page/edit.html',
        controller: 'PageEditController',
        resolve: {
          page: ['$stateParams', 'pageData', function($stateParams, pageData) {
            return pageData.getOne($stateParams.id);
          }]
        }
      })


      .state('admin.partners', {
        abstract: true,
        url: '/partners',
        template: '<div ui-view></div>',
        bodyClass: 'partners'
      })

      .state('admin.partners.index', {
        url: '',
        templateUrl: 'views/admin/partner/index.html',
        controller: 'PartnerIndexController',
        resolve: {
          partners: ['partnerData', function(partnerData) {
            return partnerData.getIndex();
          }],

          page: function() {}
        }
      })

      .state('admin.partners.new', {
        url: '/new',
        templateUrl: 'views/admin/partner/edit.html',
        bodyClass: 'new',
        controller: 'PartnerNewController'
      })

      .state('admin.partners.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/partner/edit.html',
        controller: 'PartnerEditController',
        resolve: {
          partner: ['$stateParams', 'partnerData', function($stateParams, partnerData) {
            return partnerData.getOne($stateParams.id);
          }]
        }
      })


      .state('admin.works', {
        abstract: true,
        url: '/works',
        template: '<div ui-view></div>',
        bodyClass: 'works'
      })

      .state('admin.works.index', {
        url: '',
        templateUrl: 'views/admin/work/index.html',
        controller: 'WorkIndexController',
        resolve: {
          page: function() {},

          works: ['workData', function(workData) {
            return workData.getIndex();
          }]
        }
      })

      .state('admin.works.new', {
        url: '/new',
        templateUrl: 'views/admin/work/edit.html',
        bodyClass: 'new',
        controller: 'WorkNewController'
      })

      .state('admin.works.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/work/edit.html',
        controller: 'WorkEditController',
        resolve: {
          work: ['$stateParams', 'workData', function($stateParams, workData) {
            return workData.getOne($stateParams.id);
          }]
        }
      })
  }])
;
