// IIFE - Immediately Invoked Function Expression
(function(portfolio) {
  'use strict';

  //console.log('portfolio');
  // The global jQuery object is passed as a parameter
  portfolio(window.jQuery, window, document);

  }(function($, window, document) {
      'use strict';

      //console.log('window, document');
      // The $ is now locally scoped 
      $(function() {
          // The DOM is ready!
          //console.log('inner function from window, document');
          // This is needed to prevent onreadystatechange being run twice
          var ready = false;

          document.onreadystatechange = function() {
            //console.log('onreadystatechange');
            if (ready) {
              return;
            }
            
            // interactive = DOMContentLoaded & complete = window.load
            if (document.readyState == 'interactive' || document.readyState == 'complete') {
              ready = true;
            }
          };
      });

      // The rest of your code goes here!
      // Variables
      var body = $('body'),
          desktopDevice = 'desktop-viewport',
          $mainNav = $('.navbar'),
          mobileDevice = 'mobile-viewport',
          $mobileHiddenNav = $('.navbar-links'),
          $mobileMenuToggle = $('.mobile-menu'),
          tabletDevice = 'tablet-viewport',

          handleMobileNavToggle = function () {
            $mainNav.toggleClass('navbar-active');

            $mobileHiddenNav.toggle();
          },

          handleScrollDetection = function () {

            body.addClass('scroll-active');

            clearTimeout($.data(this, 'scrollTimer'));

            $.data(this, 'scrollTimer', setTimeout(function() {
                body.removeClass('scroll-active');
            }, 1000));

          };

      enquire.register('screen and (max-width:480px)', {
        // OPTIONAL
        // If supplied, triggered when a media query matches.
        match : function() {
          body.addClass(mobileDevice);
        },      
                                    
        // OPTIONAL
        // If supplied, triggered when the media query transitions 
        // *from a matched state to an unmatched state*.
        unmatch : function() {
          body.removeClass(mobileDevice);
        },    
        
        // OPTIONAL
        // If supplied, triggered once, when the handler is registered.
        setup : function() {},    
                                    
        // OPTIONAL, defaults to false
        // If set to true, defers execution of the setup function 
        // until the first time the media query is matched
        deferSetup : true,
                                    
        // OPTIONAL
        // If supplied, triggered when handler is unregistered. 
        // Place cleanup code here
        destroy : function() {}         
      });

      enquire.register('screen and (min-width:481px) and (max-width:1023px)', {
        // OPTIONAL
        // If supplied, triggered when a media query matches.
        match : function() {       
          body.addClass(tabletDevice);
          $mobileHiddenNav.removeAttr('style');
        }, 

        // OPTIONAL
        // If supplied, triggered when the media query transitions 
        // *from a matched state to an unmatched state*.
        unmatch : function() {
          body.removeClass(tabletDevice);
        },

        // OPTIONAL
        // If supplied, triggered once, when the handler is registered.
        setup : function() {},    
                                    
        // OPTIONAL, defaults to false
        // If set to true, defers execution of the setup function 
        // until the first time the media query is matched
        deferSetup : true,
                                    
        // OPTIONAL
        // If supplied, triggered when handler is unregistered. 
        // Place cleanup code here
        destroy : function() {}
      });

      enquire.register('screen and (min-width:1024px)', {
        // OPTIONAL
        // If supplied, triggered when a media query matches.
        match : function() {
          body.addClass(desktopDevice);
          $mobileHiddenNav.removeAttr('style');
        }, 

        // OPTIONAL
        // If supplied, triggered when the media query transitions 
        // *from a matched state to an unmatched state*.
        unmatch : function() {  
          body.removeClass(desktopDevice);
        },

        // OPTIONAL
        // If supplied, triggered once, when the handler is registered.
        setup : function() {},    
                                    
        // OPTIONAL, defaults to false
        // If set to true, defers execution of the setup function 
        // until the first time the media query is matched
        deferSetup : true,
                                    
        // OPTIONAL
        // If supplied, triggered when handler is unregistered. 
        // Place cleanup code here
        destroy : function() {}
      });

      // MOBILE NAV TOGGLE MENU
      $mobileMenuToggle.on('click', handleMobileNavToggle);

      // WINDOW SCROLL DETECTION
      $(window).on('scroll', handleScrollDetection);

  }
));