var seerpodApp = angular.module('seerpodc');

seerpodApp.controller('SearchController', function($scope, $http, $ionicModal, $ionicLoading, storesService) {
 
  $scope.store = {}
  $scope.filterParam = {}
  $scope.nearbyPopularSearch = true;
  $scope.usingCurrentLoc = false;
  var themeColor = "#00b383";

  function getCurrentLatLong (callback) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      //TODO: convert lat long to address and set in store.name
      // OR let it be lat long and make searchStoreDb accept lat long
      // and pass to seerpod/search api
      $scope.store.name = parseFloat(pos.coords.latitude);
      console.log("in getCurrentLatLong lat: " + $scope.store.name);
      callback(true);
    }, function(error) {
      alert('Unable to get current position latitude and longitude: ' + error.message);
    });
  };

  $scope.searchStoreDb = function(nearbyPopularSearch) {
    console.log("search keyword: " + $scope.store.name);
    $scope.nearbyPopularSearch = nearbyPopularSearch;
    storesService.list($scope.store.name, $scope.filterParam, function(stores) {
      $scope.stores = stores;
    });

    if($scope.usingCurrentLoc) {
      $scope.usingCurrentLoc = false;
      document.getElementById("nav-icon").style.color="";
    }
  };

  // Home Page
  getCurrentLatLong($scope.searchStoreDb);
  
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
            document.getElementsByName("autocomplete-search")[0].value = results[0].formatted_address;
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
      document.getElementById("nav-icon").style.color = themeColor;
      $scope.usingCurrentLoc = true;
    }, function(error) {
      alert('Unable to get location: ' + error.message);
      $scope.loading.hide();
    });
  };

  $scope.clearSearchBox = function() {
    document.getElementsByName("autocomplete-search")[0].value = "";
    $scope.store = {};
    $scope.filterParam = {};
  };

  $scope.doRefresh = function() {
    storesService.list($scope.store.name, $scope.filterParam, function(stores) {
      $scope.stores = stores;

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
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