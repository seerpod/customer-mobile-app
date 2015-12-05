(function () {
    'use strict';

    angular.module('seerpod')
        .controller('SettingsController', ['$scope', 'Settings', 'LocalStorageService', '$ionicPopup',
            function ($scope, Settings, LocalStorageService, $ionicPopup) {
                console.log("SettingsController launching");

                // used to track if the user is a first time user, to be used in a later version of seerpod
                // if (!Settings.hasUserSeenMessage) {
                //     Settings.hasUserSeenMessage = true;
                //     LocalStorageService.serializeSettings();
                //     $ionicPopup.alert({
                //         title: 'Hi There',
                //         template: '<div class="text-center">You are a first time user.</div>'
                //     });
                // }

                // set the initial values for the widgets
                $scope.acceptPush = Settings.acceptPush;

                // when a widget is changed, come here an update the setting object too
                $scope.onChange = function (type, value) {
                    $scope[type] = value;
                    Settings[type] = value;
                    LocalStorageService.serializeSettings();
                };
            }]);
}());
