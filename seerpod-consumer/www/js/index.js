var seerpodApp = angular.module('seerpod', ['ionic']);

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
    })
    .state('popular', {
      url: '/popular',
      views: {
        popular: {
          templateUrl: 'templates/popular.html',
          controller: 'PopularController'
        }
      }
    })
    .state('settings', {
      url: '/settings',
      views: {
        settings: {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsController'
        }
      }
    });

  $urlRouterProvider.otherwise("/");
 
});

seerpodApp.factory('storesService', function($http) {
  var cachedData;
  
  function getData(storename, filterParams, callback) {
    console.log("getData called");
    console.log("filterParams: " + filterParams);
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
  
seerpodApp.controller('SearchController', function($scope, $http, $ionicModal, $ionicLoading, storesService) {
 
  $scope.store = {}
  $scope.filterParam = {}
 
  $scope.searchStoreDb = function() {
    storesService.list($scope.store.name, $scope.filterParam, function(stores) {
      $scope.stores = stores;
    });
  };

  $scope.searchStoreDb();

  google.maps.event.addDomListener(window, 'load', initialize);
  $scope.currentLocation = function() {
    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      var geocoder = new google.maps.Geocoder;
      var latlng = {lat: parseFloat(pos.coords.latitude), lng: parseFloat(pos.coords.longitude)};
        geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            $scope.currentAddress = results[0].formatted_address;
            document.getElementById("autocomplete").value = results[0].formatted_address;
          } else {
            window.alert('No results found');
            $scope.loading.hide();
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
          $scope.loading.hide();
        }
      });

      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
      $scope.loading.hide();
    });
  };

  $scope.clearSearchBox = function() {
    document.getElementById("autocomplete").value = "";
  };

  $ionicModal.fromTemplateUrl('templates/search-filter.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.filteredSearchStoreDb = function() {
    $scope.closeModal();
    $scope.searchStoreDb($scope.filterParam);
  }
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  
});

seerpodApp.controller('DetailController', function($scope, $http, $stateParams, storesService) {
  storesService.find($stateParams.storeid, function(store) {
    $scope.store = store;
  });
});

seerpodApp.controller('PopularController', function($scope, $http, $stateParams, storesService) {
  $scope.store = {}
 
  // modify this code to return nearby restaurants
  // sorted by yelp rating
  $scope.searchStoreDb = function() {
    storesService.list($scope.store.name, $scope.filterParam, function(stores) {
      $scope.stores = stores;
    });
 
  };
  
  $scope.searchStoreDB();
});
