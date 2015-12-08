var seerpodApp = angular.module('seerpodc', ['ionic', 'ion-sticky', 'google.places']);

seerpodApp.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
    .state('search', {
      url: '/',
      views: {
        search: {
          templateUrl: 'templates/search.html',
          controller: 'SearchController'
        }
      }
    })
    .state('detail', {
      url: '/store/:storeid',
      views: {
        search: {
          templateUrl: 'templates/detail.html',
          controller: 'DetailController'
        }
      }
    });

  $urlRouterProvider.otherwise("/");
 
});