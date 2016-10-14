(function() {

	'use strict';

	function FolioController(dataService) {
		// VM = Virtual model
		var vm = this,
				$body = $('body'),
				desktopDevice = 'desktop-viewport',
				$fullPageOptionsTouchDevice = {
          anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
          controlArrows: true,
          autoScrolling: false,
          fitToSection: false,
          fixedElements: '.navbar',
          menu: '#menu',
          slidesNavigation: false,
          slidesNavPosition: 'bottom',
          afterResize: function(){
            //console.log('after resize');
            $.fn.fullpage.destroy('all');
            numberOfSlides();
          }
        },
        $fullPageOptionsDesktop = {
          anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
          controlArrows: true,
          autoScrolling: false,
          scrollBar: true,
          fitToSection: true,
          fixedElements: '.navbar',
          menu: '#menu',
          navigation: true,
          navigationPosition: 'left',
          resize : true,
          slidesNavigation: false,
          slidesNavPosition: 'bottom',
          afterResize: function(){
            //console.log('after resize');
            $.fn.fullpage.destroy('all');
            numberOfSlides();
          }
        },
        $fullPage = $('#fullpage'),
				mobileDevice = 'mobile-viewport',
        resizeId,
        tabletDevice = 'tablet-viewport',
        workItemID = 0,
        panelActive = false;

    //Window resizing finished
    function doneWindowResize(){
      //console.log('window resize finished');
      initializeFullpage();
    }

    //Setup full page
    function initializeFullpage() {
      //console.log('initialise');

      if($body.hasClass(desktopDevice)){
        //console.log('DESKTOP');
        $fullPage.fullpage($fullPageOptionsDesktop);
      } else {
        $fullPage.fullpage($fullPageOptionsTouchDevice);
      }
    }

    //Work Section - Wrap every 'X' number of work items to force slider
    function numberOfSlides() {
      
      //console.log('numberOfSlides() - setup new HTML');

      var maxNumberOfItems,
          workItemSlider = $('.section.work .container .items'),
          workItemSlides = $('.section.work .container .slide');

          //console.log('number of work items ' + workItemSlider.length);

      function buildSlideHTML() {
        //console.log('building the html');
        for(var i = 0; i < workItemSlider.length; i+=maxNumberOfItems) {
          //console.log('loop the items and wrap with new HTML');
          workItemSlider.slice(i, i+maxNumberOfItems).wrapAll('<div class="slide"></div>');
        }

        //console.log('number of work slides ' + workItemSlides.length);
      }

      function destroySlideHTML() {
        //console.log('destroy existing HTML');

        $(workItemSlides).replaceWith(function() {
         return $(workItemSlider, this);
        });

        buildSlideHTML();
      }

      if ($body.hasClass(mobileDevice)) {
        //console.log('mobile device');
        maxNumberOfItems = 6;
        //console.log('set max number of items to ' + maxNumberOfItems);
      } else if ($body.hasClass(tabletDevice)) {
        //console.log('tablet device');
        maxNumberOfItems = 9;
        //console.log('set max number of items to ' + maxNumberOfItems);
      } else if ($body.hasClass(desktopDevice)) {
        //console.log('desktop device');
        maxNumberOfItems = 12;
        //console.log('set max number of items to ' + maxNumberOfItems);
      }

      // If the work items are wrapped in the 'slide' HTML then destroy, otherwise rebuild
      if(workItemSlides.length) {
        destroySlideHTML();
      } else {
        buildSlideHTML();    
      }
  
    }

    //Get work item details
    function getWorkItemDetails(workItem) {

      if (panelActive === true) {

        if (workItem !== undefined) {
          //console.log(workItem.itemId);
          return workItem.itemId == workItemID;
        }

      }

    }

    //Set the ID of the clicked work item
    function setWorkItemDetailsId(work) {

      workItemID = work.itemId;

      //console.log('work item id is: ' + work.itemId);

      //document.getElementById('jsonWorkID').value = workItemID;

      getWorkItemDetails();

    }

    //Open work item details panel
    function openWorkItemDetailsPanel($event) {
      
      $event.preventDefault();

      panelActive = true;

      //console.log(panelActive);

    }

    //Close work item details panel
    function closeWorkItemDetailsPanel($event) {
      
      $event.preventDefault();

      panelActive = false;

    }

    //Initialise full page
    vm.initializeFullpage = initializeFullpage;

		//Get access to dataService object in our view
		vm.dataService = dataService;

		//Work Section - Wrap every 'X' number of work items to force slider
		vm.numberOfSlides = numberOfSlides;

    //Set the ID of the clicked work item
    vm.setWorkItemDetailsId = setWorkItemDetailsId;

    //Click function for retrieving the work item details
    vm.getWorkItemDetails = getWorkItemDetails;

    //Click function for openning the work item details panel
    vm.openWorkItemDetailsPanel = openWorkItemDetailsPanel;

    //Click function for closing the work item details panel
    vm.closeWorkItemDetailsPanel = closeWorkItemDetailsPanel;

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
        //console.log('xxx loaded xxx');
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
          //console.log('xxx rendered xxx');
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