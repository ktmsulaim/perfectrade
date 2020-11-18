(function($) {
  "use strict";

  $("#gamesent, #hdtel, #digicam, #memstorage").owlCarousel({
    loop: true,
    margin: 15,
    nav: false,
    pagination: true,
    stagePadding: 3,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    // stagePadding: 2,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });



  $("#security-products").owlCarousel({
    loop: true,
    margin: 15,
    stagePadding: 3,
    nav: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    pagination: false,
    responsive: {
      0: {
        items: 1,
        margin: 0
      },
      600: {
        items: 2
      },
      1000: {
        items: 2
      }
    }
  });

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();
    var logo = $('header .logo_main');

    if (scroll >= box - header) {
      $("header").addClass("background-header");
      logo.attr('src', 'assets/logo.png');
    } else {
      $("header").removeClass("background-header");
      logo.attr('src', 'assets/logo_inverse.png');
    }
  });

  // Mobile menu dropdown
  $(".submenu").on("click", function() {
    var width = $(window).width();
    if (width < 992) {
      $(".submenu ul").toggleClass("active");
    }
  });

  // Scroll animation init
  window.sr = new scrollReveal();

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function() {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Menu elevator animation
  $("a.goTo").on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function() {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a.goTo').on("click", function(e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").each(function() {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 79
          },
          500,
          "swing",
          function() {
            // window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a").each(function() {
      var currLink = $(this);

      try {
        var refElement = $(currLink.attr("href"));
        if (
          refElement.position().top <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos
        ) {
          $(".nav ul li a").removeClass("active");
          currLink.addClass("active");
        } else {
          currLink.removeClass("active");
        }
      } catch (e) {
        // Ignore href='javascript:;'
      }
    });
  }

  const Accordion = {
    settings: {
      // Expand the first item by default
      first_expanded: false,
      // Allow items to be toggled independently
      toggle: false
    },

    openAccordion: function(toggle, content) {
      if (content.children.length) {
        toggle.classList.add("is-open");
        let final_height = Math.floor(content.children[0].offsetHeight);
        content.style.height = final_height + "px";
      }
    },

    closeAccordion: function(toggle, content) {
      toggle.classList.remove("is-open");
      content.style.height = 0;
    },

    init: function(el) {
      const _this = this;

      // Override default settings with classes
      let is_first_expanded = _this.settings.first_expanded;
      if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
      let is_toggle = _this.settings.toggle;
      if (el.classList.contains("is-toggle")) is_toggle = true;

      // Loop through the accordion's sections and set up the click behavior
      const sections = el.getElementsByClassName("accordion");
      const all_toggles = el.getElementsByClassName("accordion-head");
      const all_contents = el.getElementsByClassName("accordion-body");
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const toggle = all_toggles[i];
        const content = all_contents[i];

        // Click behavior
        toggle.addEventListener("click", function(e) {
          if (!is_toggle) {
            // Hide all content areas first
            for (let a = 0; a < all_contents.length; a++) {
              _this.closeAccordion(all_toggles[a], all_contents[a]);
            }

            // Expand the clicked item
            _this.openAccordion(toggle, content);
          } else {
            // Toggle the clicked item
            if (toggle.classList.contains("is-open")) {
              _this.closeAccordion(toggle, content);
            } else {
              _this.openAccordion(toggle, content);
            }
          }
        });

        // Expand the first item
        if (i === 0 && is_first_expanded) {
          _this.openAccordion(toggle, content);
        }
      }
    }
  };

  (function() {
    // Initiate all instances on the page
    const accordions = document.getElementsByClassName("accordions");
    for (let i = 0; i < accordions.length; i++) {
      Accordion.init(accordions[i]);
    }
  })();

  // Home seperator
  if ($(".home-seperator").length) {
    $(".home-seperator .left-item, .home-seperator .right-item").imgfix();
  }

  // Home number counterup
  if ($(".count-item").length) {
    $(".count-item strong").counterUp({
      delay: 10,
      time: 1000
    });
  }

  // Page loading animation
  $(window).on("load", function() {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1"
      });
    }

    $("#preloader").animate(
      {
        opacity: "0"
      },
      600,
      function() {
        setTimeout(function() {
          $("#preloader")
            .css("visibility", "hidden")
            .fadeOut();
        }, 300);
      }
    );
  });

  
  $(".nav .nav-link").on("click", function(){
    $(".nav").find(".active").removeClass("active");
    const target = $(this).data('target');
    console.log(target);
    $('#brandTabsContent').find('.active').removeClass('show active');
    $(target).addClass('show active');
    $(this).addClass("active");
 });



 function autoScrollGameTabs(){
   const navLinks = $('.nav .nav-link');
   let index = 0;

  navLinks[index].click();

  setInterval(function(){
    
    index++;

    if(index == navLinks.length){
        index = 0;
    }
    
    navLinks[index].click();
  }, 3000);
 }
 
//  autoScrollGameTabs();


 // read more
 function readMore(){
   const text = $('.read-more-text');
   text.hide();

   $('.read-more').on('click', function(e){
     const btn = $(e.target);
    text.slideToggle();
    console.log(btn.text());
    if(btn.text() == 'Read more'){
      btn.text('Read less');
    } else {
      btn.text('Read more');
    }
   });
 }

 readMore();

 // Resize hieght of category box
 function equalHeightBox(){
   const windowWidth = $(window).width();
   if(windowWidth > 0){
     const itemHeight = $('#gamesent').find('.item').height();
     $('#games-title, #hd-title, #digi-title, #storage-title').css({height: itemHeight + 80 + 'px', marginTop: '15px'});

     const securityItemHeight = $('#security-products').find('.item').height();
     $('#security-title').css({height: securityItemHeight + 80 + 'px', marginTop: '15px'});
   }
 }
 equalHeightBox();
 /**
  * Email JS
  */

 $('#contact').on('submit', function(e){
    e.preventDefault();
    const data = $(this).serializeArray();
    const params = {
      name: data[0].value,
      email: data[1].value,
      message: data[2].value
    };
    const btn = $('#form-submit');
    const resp = $(this).find('.response');

    btn.text('Sending');
    btn.attr('disabled', 'disabled');

    emailjs.send('service_hfy19uf', 'contact_response', params)
    .then(function(response) {
      resp.html(`<div class="alert alert-success">The message has been sent!</div>`);
      $(this).find('input, textarea').val('');
      btn.text('Send It');
      btn.removeAttr('disabled');
    }, function(error) {
      resp.html(`<div class="alert alert-danger">Sorry! Unable to send the message!</div>`);
      btn.text('Send It');
      btn.removeAttr('disabled');
    });
 });
})(window.jQuery);
