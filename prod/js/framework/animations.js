/*function animations() {
	var controller = $.superscrollorama({
				isVertical: true,
				triggerAtCenter: true,
				playoutAnimations: true
			}),
			resizeId,
			xxx = $( window ).height();
			


	// SECTION 1 - PARALLAX
	controller.pin($('.section.home'), xxx, {
	  anim: (new TimelineLite())
	    .append(
	      TweenMax.fromTo($('.section.home .wl-logo'), 0.5,
	        {css:{maxWidth: 450}, immediateRender:true}, 
	        {css:{maxWidth: 250}})
	    )
	    .append(
	      TweenMax.fromTo($('.section.home .text'), 0.2,
					{css:{opacity: 1, immediateRender:true}},
	        {css:{opacity: 0}})
	    )
	});

	// SECTION 2 - RANDOM POSITION
	$('.section.work .slide .items').each(function() {
		controller.addTween('.section.home .animation-trigger',
			TweenMax.from($(this), 1,
				{delay:Math.random()*0.6,css:{left:Math.random()*200-100,top:Math.random()*200-100,opacity:0}, ease:Back.easeOut})
			);
	});

	// SECTION 4 - PIN
	controller.pin($('.section.testimonial'), 400, {
	  anim: (new TimelineLite())

	    .append(
	      TweenMax.fromTo($('.section.testimonial .item-0'), 0.5, 
	        {css:{left: '-200%'}},
					{css:{left: 0}})
	    )
	    .append(
	      TweenMax.fromTo($('.section.testimonial .item-1'), 0.5,
					{css:{right: '-200%'}},
					{css:{right: 0}})
	    )
	    .append(
	      TweenMax.fromTo($('.section.testimonial .item-2'), 0.5,
					{css:{left: '-200%'}},
					{css:{left: 0}})
	    )
	});

	// SECTION 5 - SLIDE-IN
	controller.addTween(
		'.section.testimonial .animation-trigger',
		(new TimelineLite())
			.append([
				TweenMax.fromTo($('.section.contact h2'), 0.6,
					{css:{left: '-200%'}},
					{css:{left: 0}}),
				TweenMax.fromTo($('.section.contact .contact-form'), 0.6,
					{css:{bottom: '-200%', zIndex: '-1'}},
					{css:{bottom: 0, zIndex: 0}})
			]),
		400 // scroll duration of tween
	);


	//Window resizing finished
  function doneWindowResize(){
     controller.triggerCheckAnim();
  }

	$(window).resize(function () {

		clearTimeout(resizeId);
    resizeId = setTimeout(doneWindowResize, 500);

	});

};*/