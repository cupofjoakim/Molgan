'use strict';

angular.module('hakanlanar')
.controller('MainCtrl', function ($scope, $http) {
    $http.get('data/songs.json').success(function(data) {
        var randoms = [],
        arr = [],
        setRandomSongs = function(){
                $scope.youtube = [];
                while(arr.length < 10){ // Get 10 random numbers
                    var randomnumber = Math.ceil(Math.random()*(data[0].tracks.length-1));
                    var found = false;

                    for(var i=0;i<arr.length;i++){
                        if(arr[i]==randomnumber){found=true;break}
                    }
                    if(!found)arr[arr.length]=randomnumber;
                }

                for (var i=0;i<arr.length;i++){ // Slumpa tio låtar
                    randoms.push(data[0].tracks[arr[i]]);
                    console.log(data[0].tracks[arr[i]]);
                }
                console.log(randoms);
                $scope.songs = randoms;
                for (var i = $scope.songs.length - 1; i >= 0; i--) {
                    console.log($scope.songs[i].yt);
                    $scope.youtube.push($scope.songs[i].yt);
                };
        },
        time = 10,
        current = 0,
        answers = [],
        player,
        playingyt = false,
        done = false,
        playerDone = false,
        timer,
        onYouTubeIframeAPIReady = function(){
            if (!($scope.songs[current].yt === "")){
                if(!playerDone ){

                    console.log($scope.youtube);
                    var playerDone = true;
                    player = new YT.Player('player', {
                        height: '300',
                        width: '367',
                        videoId: $scope.songs[current].yt,
                        //playerVars: {'playlist':$scope.youtube},
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }
            } else {
                console.log("not yt");
            }
        },
        onPlayerReady = function(event){
            event.target.seekTo($scope.songs[current].startsat);
            event.target.playVideo();
            playingyt = true;
        },
        onPlayerStateChange = function(event){
            if (event.data == YT.PlayerState.PLAYING && !done) {
                //setTimeout(player.stopVideo, 6000);
                done = true;
            }
        },
        startSong = function(){
            time = 10;
            if(!playerDone){
                onYouTubeIframeAPIReady();
            }

            if (current === 0){
                $($('.song-entity')[current]).toggleClass('shown');
            }

            var timeBar = $('.shown').find('.timebar'),
            posX = 0;


            var countDownRunning = false;
            var countDown = function(){
                var timeBarWidth = timeBar.width();
                clearInterval(timer);
                var timer = setInterval(function(){
                    posX -= timeBarWidth / 10;
                    timeBar.css({'-webkit-transform': 'translateX('+ posX +'px)'});

                    time = time - 1;
                    if (time === 0){
                        $('.song-entity').find('.point').html(10 + 'p');
                    } else {
                        $('.song-entity').find('.point').html(time + 'p');
                    }

                    if (time === 0) {
                        clearInterval(timer);
                        countDownRunning = false;
                        timeOut();
                    }
                }, 1000);

                $('.choices-container').on('click', function(){
                    clearInterval(timer);
                    playingyt = false;
                    player.stopVideo();
                    player.destroy();
                });
            }
            var loadingInterval = setInterval(function(){
                console.log(player.getPlayerState());
                if(player.getPlayerState() === 1 && !countDownRunning){
                    clearInterval(loadingInterval);
                    $('.loader').hide();
                    $($('.thang')[current]).show();
                    setTimeout(function(){
                        //if(!countDownRunning){
                            countDown();
                        // } else {
                        //     console.log('clearing interval');
                        //     clearInterval(timer);
                        //     countDownRunning = false;
                        // }
                    }, 1000);
                    countDownRunning = true;
                }
            }, 300);
        },
        nextSong = function(){
            time = 10;
            $('.loader').show();
            $($('.song-entity')[current]).toggleClass('shown');

            if (current === 9 || current === 10){
                showResults();
                $('.loader').hide();
            } else {
                current = current + 1;
                $($('.song-entity')[current]).toggleClass('shown');
                startSong();
            }
        },
        submitAnswers = function(){

        },
        timeOut = function(){
            if(playingyt){
                player.stopVideo();
                player.destroy();
                playingyt = false;
            }
            answers.push({"nr": current, "correct": false , "points": 0});
            nextSong();
        },
        showResults = function(){
            $('.pointstotal').html($scope.points);

            var html = "";

            for (var i = 10 - 1; i >= 0; i--) {
                if (answers[i].correct){
                    var correct = "";
                } else {
                    var correct = "wrong";
                }
                html = html + "<div class='answers " + correct + "'></div>";
            };

            $('.answers-cont').html(html);
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

                player.stopVideo();
                player.destroy();
                playingyt = false;

                $('.song-entity').find('.point').html(10 + 'p');

                nextSong();
            });
        },100);
    });
});
