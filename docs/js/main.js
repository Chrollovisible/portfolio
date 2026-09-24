/************* Main Javasript ************************

    Template Name: Adrian - Personal Portfolio Template
    Author: cosmos-themes
    Version: 2.0
    Copyright 2018

****************************************/



'use strict';

$(window).on('load', function() {

    // PRELOADER
    setTimeout(function() {
        $('body').addClass('loaded');
    }, 1000);

    // NAVBAR SMOOTH SCROLL
    var sections = $('section'),
        nav = $('nav'),
        nav_height = nav.outerHeight();

    nav.find('a').on('click', function(){
        var $el = $(this),
        id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 500);
        return false;
    });
    $(window).on('scroll', function(){
        var cur_pos = $(this).scrollTop();

        sections.each(function(){
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if(cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });


    // PORTFOLIO ISOTOPE
    // PORTFOLIO ISOTOPE
    if($('.portfolio-items').length) {
        var $elements = $('.portfolio-items');
        $elements.isotope({
            percentPosition: true,
            itemSelector: '.single-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });

        $('.portfolio-filter ul li').on('click', function() {
            $('.portfolio-filter ul li').removeClass('sel-item');
            $(this).addClass('sel-item');
            var selector = $(this).attr('data-filter');
            $(".portfolio-items").isotope({
                filter: selector,
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                },
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
        });

        // Re-layout isotope grid whenever the window is resized or zoomed
        $(window).on('resize', function() {
            $elements.isotope('layout');
        });
    }
});

$(document).ready(function() {

    // WOW JS
    new WOW({
        mobile:false
    }).init();

    // Banner Height
    function bannerHeight(){
        var banner = $("#banner");
        banner.css({
            "height": $(window).height() + "px"
        });
    }
    bannerHeight();

    $(window).resize(bannerHeight);

    // NAVBAR TRANSPARENT-DARK
    $(window).scroll(function(){
        var $window = $(window);

        var win_height = $window.height()/2;
        if($window.scrollTop() >= win_height ) {
            $('.navbar').addClass('navbar-scroll-fixed');
        } else {
            $('.navbar').removeClass('navbar-scroll-fixed');
        }
    });

    //Animate progress-bar in About me section
    $(window).on('scroll', function(){
        $(".progress .progress-bar").each(function() {
            var bottom_object = $(this).offset().top + $(this).outerHeight();
            var bottom_window = $(window).scrollTop() + $(window).height();
            var progressWidth = $(this).attr('aria-valuenow') + '%';
            if (bottom_window > bottom_object) {
                $(this).css({
                    width: progressWidth
                });
            }
        });
    });

    // MAGNIFIC POPUP FOR PORTFOLIO
    $('.single-item a').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        zoom: { enabled: true,  duration: 250 }
    });

    // HOME TYPED JS
    if($('#typed').length) {
        var typed = new Typed('#typed', {
            stringsElement: '#typed-strings',
            smartBackspace: true,
            loop: true,
            typeSpeed: 30,
            backSpeed: 20,
            backDelay: 3000
        });
    }

});

// CONTACT FORM JS
(function($) {
    'use strict';

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        var uri = $(this).attr('action');
        $('#form-submit').val('Wait...');
        var name = $('#contact-name').val(),
            email = $('#contact-email').val(),
            message = $('#contact-message').val();


        var required = 0;
        $('.con-validate', this).each(function() {
            if($(this).val() == '') {
                $(this).addClass('con-error');
                required += 1;
            } else {
                if($(this).hasClass('con-error')) {
                   $(this).removeClass('con-error');
                    if(required > 0) {
                        required -= 1;
                    }
                }
            }
        });

        if(required === 0) {
            $.ajax({
                type: "POST",
                url: 'https://api.web3forms.com/submit',
                data: {
                    access_key: '63d48e12-d81b-4c0a-9057-e1c56e74302e',
                    subject: 'New message from portfolio website',
                    name: name,
                    email: email,
                    message: message
                },
                dataType: 'json',
                success: function(data) {
                    $("#contactForm input, #contactForm textarea").val('');
                    $("#contact-submit.main-button").html('Message Sent!');
                    $("#contact-submit.main-button").addClass("success");
                    console.log(data);
                },
                error: function() {
                    $("#contact-submit.main-button").addClass('error');
                    $("#contact-submit.main-button").html('Failed!');
                }
            });
        } else {
            $("#contact-submit.main-button").addClass('error');
            $("#contact-submit.main-button").html('Failed!');
        }
    })
    $(".con-validate").keyup(function() {
        $(this).removeClass('con-error');
    });

    //Safari Background Attachment Bug Fixed
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if(isSafari) {
        $("#banner, .blog-banner").css("background-attachment", "scroll");
    }

})(jQuery);

