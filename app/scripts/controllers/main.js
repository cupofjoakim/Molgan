'use strict';

angular.module('hakanlanar')
.controller('MainCtrl', function ($scope, $http) {
    $http.get('data/songs.json').success(function(data) {
        var randoms = [],
        arr = [],
        setRandomSongs = function(){
                while(arr.length < 10){ // Get 10 random numbers
                    var randomnumber=Math.ceil(Math.random()*data[0].tracks.length)
                    console.log(randomnumber);
                    var found=false;

                    for(var i=0;i<arr.length;i++){
                        if(arr[i]==randomnumber){found=true;break}
                    }
                    if(!found)arr[arr.length]=randomnumber;
                }

                for (var i=0;i<arr.length;i++){ // Slumpa tio låtar
                    randoms.push(data[0].tracks[arr[i]]);
                }
                $scope.songs = randoms;
            },
            time = 10,
            current = 0,
            answers = [],
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

                        if (time <= 0) {
                            clearInterval(timer);
                            timeOut();
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

                if (current === 9){
                    showResults();
                } else {
                    current = current + 1;
                    $($('.song-entity')[current]).toggleClass('shown');
                    startSong();
                }
            },
            timeOut = function(){
                answers.push({"nr": current, "correct": false , "points": 0});
                nextSong();
            },
            showResults = function(){
                $('.pointstotal').html($scope.points);
                $('.results').show();
            };

            setRandomSongs();
            $scope.time = time;
            $scope.points = 0;

            setTimeout(function(){
                startSong();
                $('.choices').on('click', function(){
                    if ($(this).hasClass('original')){
                        answers.push({"nr": current, "correct": true, "points": time});
                        $scope.points = $scope.points + time;
                    } else {
                        answers.push({"nr": current, "correct": false , "points": 0});
                    }

                    nextSong();
                });
            },100);
        });
});
