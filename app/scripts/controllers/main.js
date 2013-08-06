'use strict';

angular.module('hakanlanar')
.controller('MainCtrl', function ($scope, $http) {
    $http.get('data/songs.json').success(function(data) {
    var randoms = [],
        arr = [],
        setRandomSongs = function(){
                while(arr.length < 10){ // Get 10 random numbers
                    var randomnumber=Math.ceil(Math.random()*10)
                    var found=false;

                    for(var i=0;i<arr.length;i++){
                        if(arr[i]==randomnumber){found=true;break}
                    }
                    if(!found)arr[arr.length]=randomnumber;
                }

                for (var i=0;i<arr.length;i++){ // Slumpa tio låtar
                    if(data[0].tracks[i].uri === "") {
                        data[0].tracks[i].goYoutube = true;
                    } else {
                        data[0].tracks[i].goYoutube = false;
                    }

                    for (var k = data[0].tracks[i].suggestions.length - 1; k >= 0; k--) {
                        if(data[0].tracks[i].suggestions[k].uri === "") {
                            data[0].tracks[i].suggestions[k].goYoutube = true;
                        } else {
                            data[0].tracks[i].suggestions[k].goYoutube = false;
                        }
                    };

                    randoms.push(data[0].tracks[i]);
                }

            $scope.songs = randoms;
        };

	    setRandomSongs();
	    $scope.time = time

	    var timer, time = 10, posX = 0, timeBar = $('.timebar'), timeBarWidth = timeBar.width(), score = 10;
	    countDown();
	    function countDown(){
	        timer = setTimeout(function() {
	            posX -= timeBarWidth / 10;
	            timeBar.css({'-webkit-transform': 'translateX('+ posX +'px)'});
	            countDown();
	        },1000);
	        if (time <= 0) {
	        	//show results
	        }
	    }

    });
});
