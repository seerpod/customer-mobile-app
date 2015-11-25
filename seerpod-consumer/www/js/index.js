var seerpodApp = angular.module('seerpod', ['ionic']);

seerpodApp.config(function($stateProvider, $urlRouterProvider) {
 
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
      url: '/store/:storeid',
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

seerpodApp.factory('stores', function($http) {
  var cachedData;
  
  function getData(storename, callback) {
    console.log("getData called");
    cachedData = dummyData();
    callback(cachedData);
  }

  // function getData(storename, callback) {
  //   var url = 'http://api.themoviedb.org/3/',
  //     mode = 'search/movie?query=',
  //     name = '&query=' + encodeURI(storename),
  //     key = '&api_key=470fd2ec8853e25d2f8d86f685d2270e';
 
  //   $http.get(url + mode + key + name).success(function(data) {
  //     cachedData = data.results;
  //     callback(data.results);
  //   });
  // }
 
  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
      var store = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(store);
    }
  };
 
});

function dummyData() {
  restaurants = [
    {id:"1", name:"India Chaat and Curry1", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:20},
    {id:"2", name:"India Chaat and Curry2", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:50},
    {id:"3", name:"India Chaat and Curry3", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:100},
    {id:"4", name:"India Chaat and Curry4", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:60},
    {id:"5", name:"India Chaat and Curry5", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:80},
    {id:"6", name:"India Chaat and Curry6", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:60},
    {id:"7", name:"India Chaat and Curry7", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:30},
    {id:"8", name:"India Chaat and Curry8", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:20},
    {id:"9", name:"India Chaat and Curry9", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:20},
    {id:"10", name:"India Chaat and Curry10", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:70},
    {id:"11", name:"India Chaat and Curry11", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:70},
    {id:"12", name:"India Chaat and Curry12", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:80},
    {id:"13", name:"India Chaat and Curry13", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:10},
    {id:"14", name:"India Chaat and Curry14", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:20},
    {id:"15", name:"India Chaat and Curry15", location:"235, Second Street, San Francisco, CA - 94123, USA", img:"http://www.chaatandchinese.com/files/3513/3488/3420/papdichat900n.png", cuisine:"Indian", occupancy_percent:20}
  ]

  return restaurants;
}
 
seerpodApp.controller('SearchController', function($scope, $http, stores) {
 
  $scope.store = {}
 
  $scope.searchStoreDB = function() {

    stores.list($scope.store.name, function(stores) {
      $scope.stores = stores;
    });
 
  };
  
  $scope.searchStoreDB();
  
});
 
seerpodApp.controller('DetailController', function($scope, $http, $stateParams, stores) {
  stores.find($stateParams.storeid, function(store) {
    $scope.store = store;
  });
});

seerpodApp.controller('FavoritesController', function($scope, $http, $stateParams, stores) {
  // stores.find($stateParams.storeid, function(store) {
  //   $scope.store = store;
  // });
});

seerpodApp.controller('SettingsController', function($scope, $http, $stateParams, stores) {
  // stores.find($stateParams.storeid, function(store) {
  //   $scope.store = store;
  // });
});
