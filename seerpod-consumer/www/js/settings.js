(function () {
    'use strict';

    angular.module('seerpod')
        .value("Settings", {
            acceptsPushNotification: true,
            hasUserSeenMessage: false
        });
}());