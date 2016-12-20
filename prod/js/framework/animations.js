function animations() {

  //Default configurations
  var defaultTitle = {
    distance : '200%',
    easing   : 'ease-in-out',
    mobile   : false,
    reset    : true,
    opacity  : 1,
    origin   : 'left',
    scale    : 1
  };

  //Section configurations
  var homeLogo = {
    easing   : 'ease-in-out',
    mobile   : false,
    opacity  : 0,
    scale    : 0.8,
    reset    : true,
    viewOffset: { top: 300 }
  };

  var homeText = {
    easing   : 'ease-in-out',
    mobile   : false,
    opacity  : 0,
    reset    : true,
    scale    : 1,
    viewOffset: { top: 300 }
  };

  var workItems = {
    distance : '-40px',
    easing   : 'ease-in-out',
    mobile   : false,
    reset    : true,
    origin   : 'bottom'
  };

  var aboutText = {
    distance : '-200%',
    easing   : 'ease-in-out',
    mobile   : false,
    reset    : true,
    origin   : 'left'
  };

  var aboutLogo = {
    easing   : 'ease-in-out',
    mobile   : false,
    opacity  : 0,
    reset    : true,
  };

  var testimonialItems = {
    distance : '-200%',
    easing   : 'ease-in-out',
    mobile   : false,
    reset    : true,
    opacity  : 1,
    origin   : 'right',
    scale    : 1
  };

  var contactForm = {
    distance : '-100%',
    easing   : 'ease-in-out',
    mobile   : false,
    reset    : true,
    opacity  : 1,
    origin   : 'top',
    scale    : 1
  };

  //Initialise the plugin
  window.sr = ScrollReveal();

  //Default
  sr.reveal('.section h2', defaultTitle);

  //Section One
  sr.reveal('.section.home .wl-logo', homeLogo);
  sr.reveal('.section.home .text', homeText);

  //Section Two
  sr.reveal('.section.work .active .logo', workItems);

  //Section Three
  sr.reveal('.section.about .active .logo', aboutLogo);
  sr.reveal('.section.about .active .details', aboutText);

  //Section Four
  sr.reveal('.section.testimonial .items', testimonialItems);

  //Section Five
  sr.reveal('.section.contact .contact-form', contactForm);

}