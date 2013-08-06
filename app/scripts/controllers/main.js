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
            },
            time = 10,
            current = 0,
            timer,
            startSong = function(){
                if (current === 0){
                    $($('.song-entity')[current]).toggleClass('shown');
                }

                var timeBar = $('.shown').find('.timebar'),
                    posX = 0;

                var countDown = function(){
                    var timeBarWidth = timeBar.width();
                    var timer = setInterval(function(){
                        posX -= timeBarWidth / 10;
                        timeBar.css({'-webkit-transform': 'translateX('+ posX +'px)'});
                        time = time - 1;
                        console.log('woooo');

                        if (time <= 0) {
                            clearInterval(timer);
                            console.log('GAME OVER');
                        }
                    }, 1000);

                    $('.choices').on('click', function(){
                        clearInterval(timer);
                    });
                }

                countDown();
            },
            nextSong = function(){
                time = 10;
                $($('.song-entity')[current]).toggleClass('shown');

                if (current === 10){
                    showResults();
                } else {
                    current = current + 1;
                    $($('.song-entity')[current]).toggleClass('shown');
                    startSong();
                }
            },
            showResults = function(){
                $('.results').show
            };

            setRandomSongs();
            $scope.time = time

            setTimeout(function(){
                startSong();
                $('.choices').on('click', function(){
                    clearInterval(timer);
                    nextSong();
                    console.log('next-song');
                });
            },100);
        });
});