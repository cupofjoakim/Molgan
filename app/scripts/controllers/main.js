'use strict';

angular.module('hakanlanar')
.controller('MainCtrl', function ($scope, $http) {
    $http.get('data/songs.json').success(function(data) {
        var randoms = [],
            arr = [];

        while(arr.length < 10){
            var randomnumber=Math.ceil(Math.random()*10)
            var found=false;

            for(var i=0;i<arr.length;i++){
                if(arr[i]==randomnumber){found=true;break}
            }
            if(!found)arr[arr.length]=randomnumber;
        }
        console.log(arr);

        for (var i=0;i<arr.length;i++){ // Slumpa tio låtar
            randoms.push(data[0].tracks[i]);
        }

        $scope.songs = randoms;

    });
});
