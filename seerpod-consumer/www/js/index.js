var seerpodApp = angular.module('seerpod', ['ionic']);

seerpodApp.config(function($stateProvider, $urlRouterProvider) {
 
  // $stateProvider
  //   .state('search', {
  //     url: '/',
  //     views: {
  //       search: {
  //         templateUrl: 'search.html'
  //         controller: 'SearchController'
  //       }
  //     }
  //   })
  //   .state('detail', {
  //     url: '/movie/:movieid',
  //     templateUrl: 'detail.html',
  //     controller: 'DetailController'
  //   })
  //   .state('favorites', {
  //     url: '/favorites',
  //     views: {
  //       favorites: {
  //         templateUrl: 'favorites.html'
  //         controller: 'FavoritesController'
  //       }
  //     }
  //   })
  //   .state('settings', {
  //     url: '/settings',
  //     views: {
  //       settings: {
  //         templateUrl: 'settings.html'
  //         controller: 'SettingsController'
  //       }
  //     }
  //   });

  $stateProvider
    .state('search', {
      url: '/',
      views: {
        search: {
          templateUrl: 'search.html',
          controller: 'SearchController'
        }
      }
    })
    .state('detail', {
      url: '/movie/:movieid',
      views: {
        search: {
          templateUrl: 'detail.html',
          controller: 'DetailController'
        }
      }
    })
    .state('favorites', {
      url: '/favorites',
      views: {
        favorites: {
          templateUrl: 'favorites.html',
          controller: 'FavoritesController'
        }
      }
    })
    .state('settings', {
      url: '/settings',
      views: {
        settings: {
          templateUrl: 'settings.html',
          controller: 'SettingsController'
        }
      }
    });

 
  $urlRouterProvider.otherwise("/");
 
});

seerpodApp.factory('Movies', function($http) {
  var cachedData;
 
  function getData(moviename, callback) {
 
    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=470fd2ec8853e25d2f8d86f685d2270e';
 
      $http.get(url + mode + key + name).success(function(data) {
        cachedData = data.results;
        callback(data.results);
    });
  }
 
  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };
 
});
 
seerpodApp.controller('SearchController', function($scope, $http, Movies) {
 
  $scope.movie = {
    name: 'Batman'
  }
 
  $scope.searchMovieDB = function() {
 
    Movies.list($scope.movie.name, function(movies) {
      $scope.movies = movies;
    });
     
  };
  
  $scope.searchMovieDB();
  
});
 
seerpodApp.controller('DetailController', function($scope, $http, $stateParams, Movies) {
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
});

seerpodApp.controller('FavoritesController', function($scope, $http, $stateParams, Movies) {
  // Movies.find($stateParams.movieid, function(movie) {
  //   $scope.movie = movie;
  // });
});

seerpodApp.controller('SettingsController', function($scope, $http, $stateParams, Movies) {
  // Movies.find($stateParams.movieid, function(movie) {
  //   $scope.movie = movie;
  // });
});
