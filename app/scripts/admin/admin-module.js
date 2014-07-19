angular.module('app.adminModule', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin/home.html',
        bodyClass: 'l-admin white'
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
          }]
        }
      })

      .state('admin.newspapers.new', {
        url: '/new',
        templateUrl: 'views/admin/newspaper/edit.html',
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
          }]
        }
      })

      .state('admin.organizations.new', {
        url: '/new',
        templateUrl: 'views/admin/organization/edit.html',
        controller: 'OrganizationNewController'
      })

      .state('admin.organizations.edit', {
        url: '/:id/edit',
        templateUrl: 'views/admin/organization/edit.html',
        controller: 'OrganizationEditController',
        resolve: {
          organization: ['$stateParams', 'organizationData', function($stateParams, organizationData) {
            return organizationData.getOne($stateParams.id);
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
          }]
        }
      })

      .state('admin.partners.new', {
        url: '/new',
        templateUrl: 'views/admin/partner/edit.html',
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
          works: ['workData', function(workData) {
            return workData.getIndex();
          }]
        }
      })

      .state('admin.works.new', {
        url: '/new',
        templateUrl: 'views/admin/work/edit.html',
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
