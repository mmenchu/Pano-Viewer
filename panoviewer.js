/*
	Inspired by waine a. lee (http://twitter.com/Bunnyhero) and by jSwipe by Ryan Scherf (http://plugins.jquery.com/project/swipe)
  - Thanks guys

  Special thanks to Jeffrey Martin (360cities.net)

  Copyright (c) 2009 jan vrsinsky (jan dot vrsinsky at gmail dot com)

  License - code: 
  Creative Commons Sharealike Commercial: you are free to share & free to modify & free to use for commercial purposes & must keep attribution & must keep this licence
  No warranty

  License - images: 
  All Rights Reserved
*/

(function($) {
	var $this;
	var $data;

	$.fn.panoviewer = function(options) {
		$data = $.extend({
			velocityX: 0,
			velocityY: 0.3,
			
			targetAngleX: 0,
			targetAngleY: 0,
			
			interactive: false
		}, $.fn.panoviewer.settings, options);
		
		return this.each(function(){
			$this = $(this); //only the last one counts...

			if ($data.loadNow){
				$.fn.panoviewer.load();
			}
			
			setTimeout("$.fn.panoviewer.tick()", 3000);
			setTimeout(function () { window.scrollTo(0, 1) }, 3000);
		});
	};

	$.fn.panoviewer.rotate = function(changeX, changeY){
		$data.velocityX = changeY * 0.05;
		$data.velocityY = - changeX * 0.05;
		$data.interactive = true;
		//setTimeout("$.fn.panoviewer.setInteractive(false)", 10000);
	};

	$.fn.panoviewer.setInteractive = function(interactive){
		$data.interactive = interactive;
	}

	$.fn.panoviewer.tick = function(){
		$data.angleX += $data.velocityX;
		$data.angleY += $data.velocityY;
		
		//Slow down movement each tick if user has already interacted with the pano
		if ($data.interactive){
			$data.velocityX *= 0.9;
			$data.velocityY *= 0.9;
		}
		
		$data.angleX = Math.max(-88, Math.min(88, $data.angleX));
		$.fn.panoviewer.rotateTo($data.angleX, $data.angleY);
		setTimeout("$.fn.panoviewer.tick()", 30);
	};
	
	$.fn.panoviewer.load = function(){
		$("#loading").fadeIn();
		for (var i=1; i<=6; i++){
			var side = $this.find("#side"+i);
			var file;
			
			switch (i){
				case 1: file='front'; break;
				case 2: file='right'; break;
				case 3: file='back'; break;
				case 4: file='left'; break;
				case 5: file='up'; break;
				case 6: file='down'; break;
			};
			
			switch(i){
				case 1: file='http://mmenchu.net/prototype/panos/f.jpg'; break;
				case 2: file='http://mmenchu.net/prototype/panos/r.jpg'; break;
				case 3: file='http://mmenchu.net/prototype/panos/b.jpg'; break;
				case 4: file='http://mmenchu.net/prototype/panos/l.jpg'; break;
				case 5: file='http://mmenchu.net/prototype/panos/u.jpg'; break;
				case 6: file='http://mmenchu.net/prototype/panos/d.jpg'; break;
			}

			if (i==6){
				side.load(function(){
					$(this).hide();
					$(this).fadeIn();
					$("#loading").fadeOut();
				});
			}else{
				side.load(function(){
					$(this).hide();
					$(this).fadeIn();
				});
			}
			side.error(function(){ alert("Something went wrong");});
			side.attr("src", file);
		}
		$.fn.panoviewer.rotateTo($data.angleX, $data.angleY);
	}
	
	$.fn.panoviewer.rotateTo = function(angleX, angleY){
		//$this.css({"-webkit-transform" : "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)"});	
		$this.css({"-webkit-transform" : "translateZ(312px) rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)"});	
	};
	
	$.fn.panoviewer.settings = {
		pano: 'default',
		loadNow: true,		
		angleX: 0, // Positive is looking up, negative looking down
		angleY: 0,
		translateZ: 312,
	};
})(jQuery);