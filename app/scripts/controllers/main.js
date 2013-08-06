'use strict';

angular.module('hakanlanar')

  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      $scope.time = time
    ];
    var timer, time = 10, posX = 0, timeBar = $('.timebar'), timeBarWidth = timeBar.width(), score = 10;
    countDown();
    function countDown(){
    	 timer = setTimeout(function() {
			posX -= timeBarWidth / 10;
			timeBar.css({'-webkit-transform': 'translateX('+ posX +'px)'});
    		countDown();
        },1000);
    	if (time <= 0) {
    		alert('GAME OVER');
    		// place result route here
    	}
    }
    
  });

