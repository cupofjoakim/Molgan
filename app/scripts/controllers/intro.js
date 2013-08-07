'use strict';

angular.module('hakanlanar')
  .controller('IntroCtrl', function ($scope) {
  	var speechBubble = $('.intro-container').find('div');

  	speechBubble.addClass('slideUp');
  	$(document).find('audio')[0].play();
  });
