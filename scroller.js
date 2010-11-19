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

// create closure
(function($) {
	jQuery.fn.scroller = function(options) {
		var defaults = {
			// Swipe treshold detection
			threshold: {
				x: 100,
				y: 50
			},

			//override this function to actualy do something
			scroll: function(changeX, changeY){
				//defaults.debug("scroll: " + changeX + "," + changeY);
				//$("#cube").css("-webkit-transform","rotateX("+xAngle+"deg) rotateY("+finalCoord.x+"deg)");
			},
			
			debug: function(string){
				//$("#debug").html(string);
			}
		};
	
		var options = jQuery.extend( defaults, options);
		
		return this.each(function(){
			// Private variables for each DOM element
			var originalCoord = { x: 0, y: 0 };
			var finalCoord = { x: 0, y: 0 };
			var fingerId = -1;
			
			// Screen touched, store the original coordinate
			function touchStart(event) {
				//console.log('Touch start...')
				var eventData = getEventData(event);
				if (eventData){
					fingerId = eventData.fingerId?eventData.fingerId:1;
					originalCoord.x = eventData.x;
					originalCoord.y = eventData.y;
					options.debug("Touch start: " + eventData.x + "," + eventData.y);
				}
			}	

			// Update coordinates as finger is moving
			function touchMove(event) {
				if (fingerId>0){
					var eventData = getEventData(event, fingerId);
					if (eventData){
						finalCoord.x = eventData.x;
						finalCoord.y = eventData.y;
						
						var changeX = finalCoord.x - originalCoord.x;
						var changeY = finalCoord.y - originalCoord.y;
						
						//originalCoord.x = finalCoord.x;
						//originalCoord.y = finalCoord.y;	
						options.debug("Scroll: "+changeX + "," + changeY);
						options.scroll(changeX, changeY);
					}
				}
				// Calculate real angle from coordinates
				//var angleX = ((finalCoord.y/320)*360)-180;
				//var angleY = ((finalCoord.x/320)*360)-180;
				
				// Adjust the rotation 
				//rotateTo(finalCoord.x, finalCoord.y, angleX, angleY)*/
			}
			
			// Done Swiping
			// Swipe should only be on X axis, ignore if swipe on Y axis
			// Calculate if the swipe was left or right
			function touchEnd(event) {
				//console.log('Ending touch...');
				fingerId = -1;
				/*var changeY = originalCoord.y - finalCoord.y;
				if(changeY < defaults.threshold.y && changeY > (defaults.threshold.y*-1)) {
					changeX = originalCoord.x - finalCoord.x
					
					if(changeX > defaults.threshold.x) {
						defaults.swipeLeft()
					}
					if(changeX < (defaults.threshold.x*-1)) {
						defaults.swipeRight()
					}
				}*/
			}
			// Swipe was canceled
			function touchCancel(event) { 
				//console.log('Touch end...')
			}
			
			// Add touch sensor event handlers
			//this.addEventListener("touchstart", touchStart, false);
			//this.addEventListener("touchmove", touchMove, false);
			//this.addEventListener("touchend", touchEnd, false);
		//	this.addEventListener("touchcancel", touchCancel, false);
			
			// Add mouse event handlers
			this.addEventListener("mousedown", touchStart, false);
			this.addEventListener("mousemove", touchMove, false);
			this.addEventListener("mouseup", touchEnd, false);
		});
	};
	
	function getEventData(e, fingerId){
		var eventData = {};
	
		if (!e) var e = window.event;
		e.preventDefault();
		var t = e.changedTouches;
		if (t) {
			//iphone touch
			var ti;
			if (fingerId > 0) {
				for (var i=0; i<t.length; i++) {
					if (t[i].identifier == fingerId) {
						ti = t[i];
						break;
					}
				}
			}else{
				ti = t[0];
			}
			if (ti){
				eventData.fingerId = ti.identifier;
				eventData.x = ti.pageX;
				eventData.y = ti.pageY;
				return eventData;
			}
		}else{
			//mouse
			if (e.which){
				if (e.which == 0 || e.which==1) { //w3c: 0..left, 1...middle, IE: 1...left
					eventData.x = e.pageX;
					eventData.y = e.pageY;
					return eventData;
				}
			}
		}  		
		return null;
	}
})(jQuery);