/*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2017 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-beta.2
 *
 */

(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory(root));
    } else {
        root.LazyLoad = factory(root);
    }
}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    const defaults = {
        src: "data-src",
        srcset: "data-srcset",
        selector: ".lazyload"
    };

    /**
    * Merge two or more objects. Returns a new object.
    * @private
    * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
    * @param {Object}   objects  The objects to merge together
    * @returns {Object}          Merged values of defaults and options
    */
    const extend = function ()  {

        let extended = {};
        let deep = false;
        let i = 0;
        let length = arguments.length;

        /* Check if a deep merge */
        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        /* Merge the object into the extended object */
        let merge = function (obj) {
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    /* If deep merge and property is an object, merge properties */
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        /* Loop through each object and conduct a merge */
        for (; i < length; i++) {
            let obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    function LazyLoad(images, options) {
        this.settings = extend(defaults, options || {});
        this.images = images || document.querySelectorAll(this.settings.selector);
        this.observer = null;
        this.init();
    }

    LazyLoad.prototype = {
        init: function() {

            /* Without observers load everything and bail out early. */
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }

            let self = this;
            let observerConfig = {
                root: null,
                rootMargin: "0px",
                threshold: [0]
            };

            this.observer = new IntersectionObserver(function(entries) {
                entries.forEach(function (entry) {
                    if (entry.intersectionRatio > 0) {
                        self.observer.unobserve(entry.target);
                        let src = entry.target.getAttribute(self.settings.src);
                        let srcset = entry.target.getAttribute(self.settings.srcset);
                        if ("img" === entry.target.tagName.toLowerCase()) {
                            if (src) {
                                entry.target.src = src;
                            }
                            if (srcset) {
                                entry.target.srcset = srcset;
                            }
                        } else {
                            entry.target.style.backgroundImage = "url(" + src + ")";
                        }
                    }
                });
            }, observerConfig);

            this.images.forEach(function (image) {
                self.observer.observe(image);
            });
        },

        loadAndDestroy: function () {
            if (!this.settings) { return; }
            this.loadImages();
            this.destroy();
        },

        loadImages: function () {
            if (!this.settings) { return; }

            let self = this;
            this.images.forEach(function (image) {
                let src = image.getAttribute(self.settings.src);
                let srcset = image.getAttribute(self.settings.srcset);
                if ("img" === image.tagName.toLowerCase()) {
                    if (src) {
                        image.src = src;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                } else {
                    image.style.backgroundImage = "url(" + src + ")";
                }
            });
        },

        destroy: function () {
            if (!this.settings) { return; }
            this.observer.disconnect();
            this.settings = null;
        }
    };

    root.lazyload = function(images, options) {
        return new LazyLoad(images, options);
    };

    if (root.jQuery) {
        const $ = root.jQuery;
        $.fn.lazyload = function (options) {
            options = options || {};
            options.attribute = options.attribute || "data-src";
            new LazyLoad($.makeArray(this), options);
            return this;
        };
    }

    return LazyLoad;
});



// JAVASCRIPT BREAKPOINTS

var breakpoint = {};
breakpoint.refreshValue = function () {
  this.value = window.getComputedStyle(document.querySelector('.body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

$(window).resize(function () {
  breakpoint.refreshValue();
  // console.log(breakpoint.value + "asdsad");
}).resize();

if (breakpoint.value == 'desktop') {
  // console.log('Tablet breakpoint');
  var jsbreakpoint = "desktop";
}
else {
  // console.log('Some other breakpoint');
  var jsbreakpoint = "mobile";
  console.log(jsbreakpoint);
}

// createCookie('cookie','theme-default',1);

updateResult();

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// DATEPICKER

$('.t-datepicker').tDatePicker({
     autoClose        : true,
     numCalendar    : 2,
     iconArrowTop : true,
  iconDate     : '<i class="fa fa-calendar" aria-hidden="true"></i>',
  arrowPrev    : '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
  arrowNext    : '<i class="fa fa-chevron-right" aria-hidden="true"></i>',

  limitPrevMonth : 0,
  limitNextMonth : 11,
  limitDateRanges: 90,


    });

// CHANGE CSS

$("#cssChanger li a").click(function() {

    var cookieCSS = $(this).attr('rel');
    var cookiePath = $(this).data('path');

    // console.log(cookiename);

    $("#themecss").attr("href", $(this).attr('rel'));
    $("#logo").attr("src", $(this).data('path'));

    $.cookie('theme-css', cookieCSS);
    $.cookie('theme-path', cookiePath);
    // $.cookie('theme-logo', cookiename);

    return false;
});

function updateResult() {

    var cookieTheme = $.cookie('theme-css');
    var cookieLogo = $.cookie('theme-path');

    //console.log(cookieTheme + "bla")

    // console.log(cookieTheme);
    // console.log(cookieLogo);

    if (cookieTheme == null || cookieTheme == 'assets/css/styles.min.css') {
        console.log('Default theme')
    } else {
        $('#themecss').attr('href', cookieTheme);
        console.log(cookieTheme);
    }

    if (cookieLogo == null || cookieLogo == 'assets/img/edmbooking/logo.svg') {
        console.log('Default theme')
    } else {
        $("#logo").attr("src", cookieLogo);
    }
}

// CHANGE PATH



// var bodyHeight = $('.body').outerHeight();
// var headerHeight = $('.header').outerHeight();
// var footerHeight = $('#footer').outerHeight();
// var sectionHeight = $('.full-height').outerHeight();

// console.log(bodyHeight-headerHeight-footerHeight);
// $('.full-height').css("min-height", bodyHeight-headerHeight-footerHeight);

// $('.body').css("padding-bottom", footerHeight);

// ODOMETER

window.odometerOptions = {
    format: 'dd',
    duration: 10000,
    // animation: 'count'
};

setTimeout(function() {
    $('.odometer').html(99);
}, 2000);

// Lazyload

$("img.lazyload").lazyload({
    effect : "fadeIn"
});

var bLazy = new Blazy();

// var bodyheight = $('.sitewrapper').outerHeight() - $('.header').outerHeight();

// $('.subnav').css("height", bodyheight);

// console.log(bodyheight);

// SHOW HAMBURGER MENU

$('.toggle-subnav').click(function() {
    // $('.hamburger').toggleClass("hamburger-close");
    $('.hamburger').toggleClass("is-active");
    $('#subnav').toggleClass("subnav-active");
    // $('.body').toggleClass("scroll-lock");
    return false;
    $('body').attr('scroll', 'no');
});

$('.closeCookies').click(function() {
    $('.cookies').fadeToggle("fast");
});

$('.toggle-discount').click(function() {
    $('.discount').fadeToggle(0);
    $('.discount-overview').fadeToggle(0);
    return false;
});



// TOGGLE FILTERS

$('.toggle-filters').click(function() {
    $('#filters').fadeToggle("fast");
    return false;
});
//  READMORE


$('.readmore').click(function() {
    console.log("bla");
    $(this).closest('.room-content').find('.room-info').toggleClass("room-info--active");
    // $('body, .html').attr('scroll','no');
});


// POPUP
$('#standalone').popup({
    color: '#000',
    opacity: .5,
    transition: '0.3s',
    scrolllock: true
});


// Toggle cart

$('.toggle-cart').click(function() {
    $('.state-empty').toggleClass("d-block");
    $('.state-filled').toggleClass("d-none");
    return false;
});

// NOTIFICATION
$('.notification').delay(3500).fadeOut("fast");


// SHOW YOUR BOOKING

$('.toggle-yourbooking').click(function() {
    $('.yourbooking').slideToggle(300);
    $('.body').toggleClass("scroll-lock");
    return false;
    $('body').attr('scroll', 'no');
    // $('.body, .html').toggleClass("scroll-lock");
    // $('body, .html').attr('scroll','no');
});


// GO BACK
function goBack() {
    window.history.back();
    return false;
}


// Scroll To

$(".scrollTo").click(function() {
    console.log($(this).data('target'));
    $('html, body').animate({
        scrollTop: $($(this).data('target')).offset().top - 49
    }, 1000, 'easeInOutCubic');
});

// CUSTOM SELECT

$(function() {
    $('select').selectric({
        maxHeight: 148
    });
});

// SCROLL HEADER

var headerheight = $(".header").outerHeight();

// console.log(headerheight);

$(window).scroll(function() {
    var scroll = $(window).scrollTop();


    if (scroll >= headerheight) {
        $(".body").addClass("scrolled");
        // $(".site-background").addClass("scrolled");
    } else {
        $(".body").removeClass("scrolled");
        // $(".site-background").removeClass("scrolled");
    }

});

// INFO PAGE & FAQ

$(".info-label").click(function() {
    console.log($(this).data('list'));
    $('html, body').animate({
        scrollTop: $("#" + $(this).data('list')).offset().top - 50
    }, 1000, 'easeInOutCubic');
});

$(".info-list-item").click(function() {

    var question = $(this);
    var question_active = $(question).find(".info-list-answer");

    if ($(question).find(".info-list-question").hasClass("active")) {
        $(".info-list-answer").slideUp(500, 'easeOutCubic');
        $(".info-list-question").removeClass("active");
    } else {
        $(".info-list-question").removeClass("active");
        $(".info-list-answer").slideUp(500, 'easeOutCubic');
        $(question_active).slideDown(500, 'easeOutCubic');
        $(question).find(".info-list-question").addClass("active");
    }
});

// SLIDESHOW

$( ".slideshowbg" ).each(function() {
  var attr = $(this).attr('data-src');

  if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css('background-image', 'url('+attr+')');
  }

});

// OWL

$(document).ready(function() {
    var owlReviews = $('.owl-reviews');
    owlReviews.owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        loop: true,
        autoplaySpeed: 1000,
        navSpeed: 1000,
        dotsSpeed: 1000,
        dragEndSpeed: 1000,
        // animateOut: 'slideOutDown',
        // animateIn: 'flipInX',
    })

    var owlSlideshow = $('.owl-slideshow');
    owlSlideshow.owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        lazyLoad: false,
        loop: true,
        dots: false,
        autoplaySpeed: 1000,
        navSpeed: 1000,
        dotsSpeed: 1000,
        dragEndSpeed: 1000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
    })

    $(".slide-next").click(function() {
        owlSlideshow.trigger('next.owl.carousel');
    });

    $(".slide-prev").click(function() {
        owlSlideshow.trigger('prev.owl.carousel');
    });

    var owl = $('.owl-pictures');

    owl.owlCarousel({
        responsiveRefreshRate: 200,
        margin: 0,
        nav: false,
        dots: true,
        lazyLoad: true,
        // animateOut: 'slideOutLeft',
        // animateIn: 'slideInRight',
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 3000,
        loop: true,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1,
                dots: false
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    })

    $(".my-next-button").click(function() {
        owl.trigger('next.owl.carousel');
    });

    $(".my-prev-button").click(function() {
        owl.trigger('prev.owl.carousel');
    });
});

$(".owl-preview").each(function(){
    $(this).owlCarousel({
     items: 1,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        lazyLoad: true,
        loop: true,
        dots: false,
        autoplaySpeed: 1000,
        navSpeed: 1000,
        dotsSpeed: 1000,
        dragEndSpeed: 1000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
    });
  });




// TOGGLE

$('*[data-type="grouptoggle"]').click(function() {
    var toggletarget = $("." + $(this).data('target'));

    $(this).toggleClass("group-open");
    $(toggletarget).fadeToggle("fast");

    if ($(this).hasClass("group-open")) {
        $('html, body').animate({
            scrollTop: $("." + $(this).data('target')).offset().top - 80
        }, 1000, 'easeInOutCubic');
    }
    return false;
});

$('*[data-type="toggle"]').click(function() {
    var toggletarget = $(this).data('target');
    $(toggletarget).fadeToggle("fast");
    $(this).toggleClass("active");
    return false;
});

$(document).on("click", function () {
    if(document.getElementById("setLanguage").style.display == "block"){
        $("#setLanguage").fadeToggle("fast");
    }
});



$('*[data-type="slidetoggle"]').click(function() {

    var toggletarget = $(this).data('target');
    $(toggletarget).slideToggle("fast");
    return false;
    // console.log(toggletarget + "blaat");
});

$('*[data-type="hovertoggle"]').hover(function() {
    console.log(toggletarget + "blaat");
    var toggletarget = $(this).data('target');
    $(toggletarget).slideToggle("fast");
    return false;
    // console.log(toggletarget + "blaat");
});


// DATEPICKER

$('.datepicker').datepicker({
    // format: "dd/mm/yyyy",
    autoclose: true,
    // todayHighlight: true
});
$('#event_period').datepicker({
    inputs: $('.actual_range'),
    autoclose: true,
    todayHighlight: true,
    clearBtn: true
});

$('#blaat').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '04-04-2018',
    endDate: '04-10-2018',
    autoclose: true,
    todayHighlight: true
});

// YOUTUBE VIDEO
var youtubeID = $('#hero-video').data('youtubecontent');
var youtubeStart = $('#hero-video').data('starttime');
var youtubeEnd = $('#hero-video').data('endtime');
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var starttime = youtubeStart;
var endtime = youtubeEnd;

var player;


// console.log(youtubeID);

function onYouTubeIframeAPIReady() {

    player = new YT.Player('hero-video', {
        videoId: youtubeID,
        playerVars: {
            controls: '0',
            start: starttime,
            end: endtime,
            playlist: youtubeID,
            loop: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.seekTo(starttime);
    event.target.setVolume(0);
    event.target.playVideo();
    // player.playVideo();
}

function onPlayerStateChange(state) {
    // player.setPlaybackRate(suggestedRate:0.5);
}

function restartVideoSection() {
    player.seekTo(starttime);
    // alert("bla");
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.PLAYING && !done) {
        // alert("bla");
        done = true;
    }
    if (event.data == YT.PlayerState.ENDED && done) {
        restartVideoSection();
    }
    // event.target.setVolume(0);
}

function vidRescale() {

    var w = $('.videowrapper').outerWidth();
    var h = $('.videowrapper').outerHeight();

    if (w / h > 16 / 9) {
        $('.videoplayer').css({
            'width': w + 'px',
            'height': w / 16 * 9 + 'px'
        })
        // $('.video-background .videoplayer').css({'left': '0px'});
    } else {
        $('.videoplayer').css({
            'width': h / 9 * 16 + 'px',
            'height': h + 'px'
        })
        // $('.video-background .videoplayer').css({'left': -($('.video-background').outerWidth()-w)/2});
    }
}

vidRescale();

// FADEIN VIDEO
setTimeout(function() {
    $('#hero-video').addClass('animated fadeIn');
}, 1500);



// Make footer stick to bottom

function stickyFooter() {
    var bodyHeight = $('.body').outerHeight();
    var headerHeight = $('.header').outerHeight();
    var footerHeight = $('#footer').outerHeight();
    var hf = bodyHeight - footerHeight - headerHeight;
    console.log(hf);

    $('.main').css('min-height', hf + 'px');
}

stickyFooter();

$(window).resize(function() {
    stickyFooter();
});


// SLIDER


$("#slider1").sliderResponsive({
// Using default everything
slidePause: 5000,
fadeSpeed: 1000,
autoPlay: "on",
showArrows: "off",
hideDots: "on",
hoverZoom: "off",
// titleBarTop: "off"
});

