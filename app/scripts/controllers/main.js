'use strict';

angular.module('hakanlanar')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('data/songs.json').success(function(data) {
        $scope.songs = data[0].tracks;

        for (var i = $scope.songs.length - 1; i >= 0; i--) {
            console.log($scope.songs[i]);
        };

    });
  });
