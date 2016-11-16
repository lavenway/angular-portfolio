(function() {

	'use strict';

	function FolioController(dataService, $http) {
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
          },
        },
        $fullPage = $('#fullpage'),
        maxNumberOfItems,
				mobileDevice = 'mobile-viewport',
        randomNumber = Math.floor(Math.random()*8999+1000),
        resizeId,
        tabletDevice = 'tablet-viewport',
        panelActive = false,
        workItemID = 0,
        workItemIndex = 0;

    //Setup full page
    function initializeFullpage() {
      //console.log('initialise plugin');

      if($body.hasClass(desktopDevice)){
        //console.log('DESKTOP');
        $fullPage.fullpage($fullPageOptionsDesktop);
      } else {
        //console.log('MOBILE');
        $fullPage.fullpage($fullPageOptionsTouchDevice);
      }
    }

    //Window resizing finished
    function doneWindowResize(){
      //console.log('window resize finished');
      calculateNumberofSlides();
      initializeFullpage();
    }

    //Work Section - Wrap every 'X' number of work items to force slider
    function numberOfSlides() {
      
      //console.log('numberOfSlides() - setup new HTML');

      var workItemSlider = $('.section.work .container .items'),
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

        /*$(workItemSlides).replaceWith(function() {
         return $(workItemSlider, this);
        });*/

        workItemSlides.replaceWith(function() {
         return workItemSlider;
        });

        buildSlideHTML();
      }

      // If the work items are wrapped in the 'slide' HTML then destroy, otherwise rebuild
      if(workItemSlides.length) {
        //console.log('destroy');
        destroySlideHTML();
      } else {
        //console.log('build');
        buildSlideHTML();
      }

    }

    // Calculate number of slides required for the work section
    function calculateNumberofSlides() {
      //console.log('calculate number of slides');

      if ($body.hasClass(mobileDevice)) {
        maxNumberOfItems = 6;
        //console.log('mobile device - set max number of items to ' + maxNumberOfItems);
      } else if ($body.hasClass(tabletDevice)) {
        maxNumberOfItems = 9;
        //console.log('tablet device - set max number of items to ' + maxNumberOfItems);
      } else if ($body.hasClass(desktopDevice)) {
        maxNumberOfItems = 12;
        //console.log('desktop device - set max number of items to ' + maxNumberOfItems);
      }

      numberOfSlides();

      return;
 
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

    //Show specific details of thumbnail
    function updateThumbDetails(index) {

      workItemIndex = index;

    }

    //If a current image is the same as the requested image
    function isActive(index) {

      return workItemIndex === index;

    }

    //Randomise an array when called
    function randomizeArray() {
      
      return 0.5 - Math.random();

    }

    //Random number for the anti-spam contact form
    function getRandomNumber() {
      
      //console.log(randomNumber);

      return randomNumber;

    }

    // calling our contact submit function.
    function contactFormSubmit() {

      //console.log(vm.user);

      //console.log(randomNumber);

      var urlBase = 'HTMLResources/php/contact.php';

      vm.errorHeaderMessage = '';
      vm.successHeaderMessage = '';

      // Posting data to php file
      $http({
        method  : 'POST',
        url     : urlBase,
        data    : vm.user, //forms user object
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        cache: false
       })
        .success(function(data) {
          //console.log(data);
          if (data.errors) {
            //console.log(vm.user);
            vm.validationError = true;
            vm.validationSuccess = false;
            vm.errorHeaderMessage = data.errorHeaderMessage;
            vm.errorName = data.errors.name;
            vm.errorEmail = data.errors.email;
            vm.errorMessage = data.errors.message;
            vm.errorNumber = data.errors.human;
          } else {
            vm.validationError = false;
            vm.validationSuccess = true;
            vm.successHeaderMessage = data.successHeaderMessage;
            vm.errorName = '';
            vm.errorEmail = '';
            vm.errorMessage = '';
            vm.errorNumber = '';
            vm.user = {};
          }

        });

    }

    //Initialise full page
    vm.initializeFullpage = initializeFullpage;

		//Get access to dataService object in our view
		vm.dataService = dataService;

		//Work Section - Wrap every 'X' number of work items to force slider
		vm.calculateNumberofSlides = calculateNumberofSlides;

    //Set the ID of the clicked work item
    vm.setWorkItemDetailsId = setWorkItemDetailsId;

    //Click function for retrieving the work item details
    vm.getWorkItemDetails = getWorkItemDetails;

    //Click function for openning the work item details panel
    vm.openWorkItemDetailsPanel = openWorkItemDetailsPanel;

    //Click function for closing the work item details panel
    vm.closeWorkItemDetailsPanel = closeWorkItemDetailsPanel;

    //Show details of selected work item thumbnail
    vm.updateThumbDetails = updateThumbDetails;

    //Set image as the active image
    vm.isActive = isActive;

    //Randomise an array
    vm.randomizeArray = randomizeArray;

    //Generate a random number for the contact page
    vm.getRandomNumber = getRandomNumber;

    //Click function for retrieving contact from submission
    vm.contactFormSubmit = contactFormSubmit;

    // create a blank object to handle form data.
    vm.user = {
      name: '',
      email: '',
      message: '',
      randomnumber: randomNumber,
      human: null
    };

    //Window resized
    $(window).resize(function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneWindowResize, 500);
    });

	}

	//Call the function after ng-repeat in work section has finished
	function Loaded() {
  	return {
      scope: { callbackFn: '&' },
      link: function(scope) {

        //console.log('xxx loaded ng repeat in work section xxx');

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

        setTimeout(function() {
          //console.log('xxx site has rendered initialise the fullpage plugin xxx');
          scope.callbackrenderFn();
        }, 0); // wait...

      } 
  	};
  }

	angular
		.module('folioFramework')
		.controller('folioCtrl', FolioController)
		.directive('loadedDirective', Loaded)
		.directive('initializeDirective', Initialise);

	FolioController.$inject = ['dataService', '$http'];

})();