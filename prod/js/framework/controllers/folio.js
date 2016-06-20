(function() {

	'use strict';

	function FolioController(dataService) {
		// VM = Virtual model
		var vm = this,
				body = $('body'),
				desktopDevice = 'desktop-viewport',
				fullPageOptionsTouchDevice = {
          anchors: ['section1', 'section2', 'section3', 'section4', 'section5'],
          controlArrows: false,
          autoScrolling: false,
          fitToSection: false,
          fixedElements: '.navbar',
          menu: '#menu',
          //navigation: true,
          //navigationPosition: 'left',
          slidesNavigation: true,
          slidesNavPosition: 'top',
          afterResize: function(){
            console.log('after resize');
            $.fn.fullpage.destroy('all');
            numberOfSlides();
          }
        },
        fullPageOptionsDesktop = {
          anchors: ['section1', 'section2', 'section3', 'section4', 'section5'],
          controlArrows: true,
          fixedElements: '.navbar',
          menu: '#menu',
          navigation: true,
          navigationPosition: 'left',
          resize : true,
          slidesNavigation: true,
          slidesNavPosition: 'top',
          afterResize: function(){
            console.log('after resize');
            $.fn.fullpage.destroy('all');
            numberOfSlides();
          }
        },
        fullPage = $('#fullpage'),
        fullPageSections = $('#fullpage .section'),
				mobileDevice = 'mobile-viewport',
        resizeId,
        tabletDevice = 'tablet-viewport';

    //Window resizing finished
    function doneWindowResize(){
        console.log('window resize finished');
        initializeFullpage();
    }

    //Setup full page
    function initializeFullpage() {
        console.log('initialise');
        //$(fullPage).fullpage(fullPageOptions);

        if(body.hasClass(desktopDevice)){
          console.log('DESKTOP');
          $(fullPage).fullpage(fullPageOptionsDesktop);
        } else {
          $(fullPage).fullpage(fullPageOptionsTouchDevice);
        }
    }

		// Update the data attribute with the slide number
    function setSliderDataAttribute() {
  
      var name = 'slide',
          newname = '',
          workDataAttributes = $('.section.work .container .slide');

      $(workDataAttributes).each(function(i) {
        console.log('setting the value of the data attribute');
        var num = 1,
            myIndex = num + i;

        myIndex = myIndex++;
        console.log('myindex ' + myIndex);
        newname = name + myIndex;
        console.log('newname ' + newname);
        
        $(this).attr('data-anchor', newname);
      });

    }

    //Work Section - Wrap every 'X' number of work items to force slider
    function numberOfSlides() {
      
      console.log('numberOfSlides() - setup new HTML');

      var maxNumberOfItems,
          workItemSlider = $('.section.work .container .items'),
          workItemSlides = $('.section.work .container .slide');

          console.log('number of work items ' + workItemSlider.length);

      function buildSlideHTML() {
        console.log('building the html');
        for(var i = 0; i < workItemSlider.length; i+=maxNumberOfItems) {
          console.log('loop the items and wrap with new HTML');
          workItemSlider.slice(i, i+maxNumberOfItems).wrapAll('<div class="slide" data-anchor="slide1"></div>');
        }

        console.log('number of work slides ' + workItemSlides.length);
      }

      function destroySlideHTML() {
        console.log('destroy existing HTML');

        $(workItemSlides).replaceWith(function() {
         return $(workItemSlider, this);
        });

        buildSlideHTML();
      }

      if (body.hasClass(mobileDevice)) {
          console.log('mobile device');
          maxNumberOfItems = 6;
          console.log('set max number of items to ' + maxNumberOfItems);
      } else if (body.hasClass(tabletDevice)) {
          console.log('tablet device');
          maxNumberOfItems = 8;
          console.log('set max number of items to ' + maxNumberOfItems);
      } else if (body.hasClass(desktopDevice)) {
          console.log('desktop device');
          maxNumberOfItems = 18;
          console.log('set max number of items to ' + maxNumberOfItems);
      }

      // If the work items are wrapped in the 'slide' HTML then destroy, otherwise rebuild
      if(workItemSlides.length) {
        destroySlideHTML();
      } else {
        buildSlideHTML();    
      }

      setSliderDataAttribute();
  
    }
    
    //Initialise full page
    vm.initializeFullpage = initializeFullpage;

		//Get access to dataService object in our view
		vm.dataService = dataService;

		//Work Section - Wrap every 'X' number of work items to force slider
		vm.numberOfSlides = numberOfSlides;

    //Window resized
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneWindowResize, 500);
    });

	}

	//Call the function after ng-repat has finished
	function Loaded() {
  	return {
        scope: { callbackFn: '&' },
        link: function(scope) {
            console.log('xxx loaded xxx');
            scope.callbackFn();
        },
    };
  }

  //Call the function after the site has rendered
  function Initialise() {
  	return {
      restrict: 'A',
      scope: { callbackrenderFn: '&' },
      link: function(scope){

        $(window).load(function() {
          console.log('xxx rendered xxx');
          scope.callbackrenderFn();
        });
      }
  	};
  }

	angular
		.module('folioFramework')
		.controller('folioCtrl', FolioController)
		.directive('loadedDirective', Loaded)
		.directive('initializeDirective', Initialise);

	FolioController.$inject = ['dataService'];

})();