var seerpodApp = angular.module('seerpodc');

seerpodApp.controller('SearchController', function($scope, $http, $ionicModal, $ionicLoading, storesService) {
 
  $scope.store = {}
  $scope.filterParam = {}
  $scope.nearbyPopularSearch = true;
 
  $scope.searchStoreDb = function() {
    if ($scope.store.name && $scope.store.name != '') {
      $scope.nearbyPopularSearch = false;
    } else {
      $scope.nearbyPopularSearch = true;
    }
    storesService.list($scope.store.name, $scope.filterParam, function(stores) {
      $scope.stores = stores;
    });
  };

  // home page of the app
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
    $scope.store = {};
    $scope.filterParam = {};
  };

  $scope.doRefresh = function() {
    $http.get('/new-items')
     .success(function(newItems) {
       $scope.items = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
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