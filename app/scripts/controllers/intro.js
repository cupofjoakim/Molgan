'use strict';

angular.module('hakanlanar')
  .controller('IntroCtrl', function ($scope) {
  	var speechBubble = $('.intro-container').find('div');

  	speechBubble.addClass('slideUp');
  });
