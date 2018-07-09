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
// createCookie('cookie','theme-default',1);

updateResult();

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


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

$("img.lazyload").lazyload();

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
    $('select').selectric();
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
        dragEndSpeed: 1000
        // animateOut: 'slideOutDown',
        // animateIn: 'flipInX',
    })

    var owl = $('.owl-pictures');
    owl.owlCarousel({
        responsiveRefreshRate: 200,
        margin: 0,
        nav: false,
        dots: true,
        // animateOut: 'slideOutLeft',
        // animateIn: 'slideInRight',
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 3000,
        loop: true,
        autoplayHoverPause: true,
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
    return false;
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
    // console.log(hf);

    $('.main').css('min-height', hf + 'px');
}

stickyFooter();

$(window).resize(function() {
    stickyFooter();
});


var can = Canvallax({
  className: 'bg-canvas',
  damping: 40
});

// Clouds
(function(){

  ////////////////////////////////////////


  var origWidth = width = document.body.clientWidth,
      origHeight = height = document.getElementById("main").clientHeight;

  // var gradient = Canvallax.Rectangle({
  //   width: width * 1.5,
  //   height: height * 1.1,
  //   zIndex: 1,

  //   })()
  // });

  // can.add(gradient);

  function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

  var stars = [],
      number = 300,
      i = 0,
      distance;

  for (; i < number; i++) {
    distance = randomRange(0.1,0.3);
    stars.push(
      Canvallax.Circle({
        x: Math.random() * width,
        y: Math.random() * height * 0.9,
        distance: distance,
        size: 4,
        fill: '#FFF',
      })
    );
  }

  can.add(stars);

  window.addEventListener('resize', function(){

    height = document.body.clientHeight;

    var i = can.elements.length,
        max = document.body.clientWidth,
        heightScale = height / origHeight;

    console.log(height,origHeight,heightScale);

    while (i--){
      can.elements[i].maxX = max; //document.body.clientWidth;
      can.elements[i].origY = can.elements[i].origY || can.elements[i].y;
      can.elements[i].y = can.elements[i].origY * heightScale;
    }
  });

  ////////////////////////////////////////

  // Adapted from https://bost.ocks.org/mike/algorithms/
  function bestCandidateSampler(width, height, numCandidates) {

    var samples = [];

    function findDistance(a, b) {
      var dx = a[0] - b[0],
          dy = a[1] - b[1];
      return dx * dx + dy * dy;
    }

    function findClosest(c){
      var i = samples.length,
          sample,
          closest,
          distance,
          closestDistance;

      while(i--){
        sample = samples[i];
        distance = findDistance(sample,c);

        if ( !closestDistance || distance < closestDistance ) {
          closest = sample;
          closestDistance = distance;
        }
      }

      return closest;
    }

    function getSample() {
      var bestCandidate,
          bestDistance = 0,
          i = 0,
          c, d;

      c = [Math.random() * width, Math.random() * height];

      if ( samples.length < 1 ) {
        bestCandidate = c;
      } else {
        for (; i < numCandidates; i++) {
          c = [Math.random() * width, Math.random() * height];
          d = findDistance(findClosest(c), c);

          if (d > bestDistance) {
            bestDistance = d;
            bestCandidate = c;
          }
        }
      }

      samples.push(bestCandidate);
      //console.log('bestCandidate',bestCandidate);
      return bestCandidate;
    }

    getSample.all = function(){ return samples; };
    getSample.samples = samples;

    return getSample;
  }

  var getCandidate = bestCandidateSampler(width,height,10);

  var CLOUD_COUNT = 1000,
      CLOUD_WIDTH = 510,
      CLOUD_HEIGHT = 260;

  CLOUD_COUNT = Math.floor(( width * height ) / (CLOUD_WIDTH * CLOUD_HEIGHT));
    CLOUD_COUNT = 8;

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomizedCloud(image){

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        width = canvas.width = randomRange(400,700), //CLOUD_WIDTH,
        height = canvas.height = randomRange(200,260),//CLOUD_HEIGHT,
        w = image.width,
        h = image.height,
        halfw = w / 2,
        halfh = h / 2,
        i = Math.ceil(randomRange(20,90)), //60
        flip,
        randScale,
        randTex,
        maxScale = 2.5,
        fullPi = Math.PI / 2;

    while (i--){
      randScale = randomRange(0.4,maxScale);
      ctx.globalAlpha = Math.random() - 0.2;
      ctx.translate(randomRange(halfw, width - ( w * maxScale * 1.3)),randomRange(halfh + halfh / 4,height - (h* maxScale)));
      ctx.scale(randScale,randomRange(randScale - 0.3,randScale));
      ctx.translate(halfw,halfh);
      ctx.rotate(randomRange(0,fullPi));
      ctx.drawImage(image, -halfw, -halfh);//, w, h, 0, 0, w, h);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    return canvas;//.toDataURL();
  }

  var cloudImg = new Image();

  cloudImg.addEventListener('load',function(){

    var i = CLOUD_COUNT, //Math.ceil(CLOUD_COUNT * 0.5),
        el, rand, pos, tex;

    while(i--) {
      rand = randomRange(0.4, 1.2);
      pos = getCandidate();
      tex = randomizedCloud(cloudImg);

      cloud = Canvallax.Image({
        image: tex,
        width: tex.width,
        height: tex.height,
        //init: function(){},

        zIndex: rand * 13,
        x: pos[0],
        y: pos[1],
        opacity: (rand < 0.8 ? 0.8 : rand ),
        distance: rand,

        maxX: width,
        speed: rand * randomRange(0.2,0.4),
        postRender: function(){
          this.x = (this.x * this.distance) > -this.width ? this.x - this.speed : this.maxX + (this.width * 2) ;
        }
      });

      can.add(cloud);
    }

    can.render();
  });

  cloudImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAAYFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8GYpHzAAAAIHRSTlMAAwcLDxIWGh8kKzI5QEhPVl9qc3uEi5Sdpa64wcrV4c6KdP8AAAOeSURBVHgBndQJkvM8DoNhS+nv/ieONBH8FIs1nb83ZLfF1wBFZ17vNMZ8fPz79/GY46Xre8F85kRzzhdk/A2TOpSARpF/g0mdaI8XZjg47leA32Jo3wbEooNE/SFGrPOAiPxC+xaDAxBTxQqFoW8wGGof89E4j8nQUceo621h/KY8GuXx4Mg10vRZlPd55JCEnXlIQX7cE8pNp8Dob4oY8LjZTny8QEMo2o2hSqT5YImxchVNbpgZ3oVR4xVUgOlGS5fFKCPSWDY4Yu1xIKyEEqLfE0UUKcoJ9MFVsAhnaOpEGW4gyxFyLitOeRhZO8NJur1hKpWWCV03oaG9yYcYXvD7UPbetVOMNwqlWH6/b7sp29G1Z5g6LFGaY9uYB2A6M7evtVco3U3M1CCopOlNY8Q7cdZahxIMTpv7meR2NghWDqdu8MTZzwMqN+RaBkmdUgf7wMfN1d1cNSAFMdhQ3tLXu2STuclylwYL5QYhsGyLz499bcgxK1F5SmumvaoRrIwSjYutaGbVZIgze6wegLO6i8MD2kJ1N1cYKAUXTLnRWxtnYrMONWRRD+EsA3utw4mnKxNCZRgplK5T05ycvaaZCmtAOEKl+p4ge70k06mcdrQoPgGpbY1EboNyY7/ZHVsfK1BLhBAdCA5MGd719b0gUOJmg9vc5hf3E+K2y1EQDnCjxoGs3t84WiA6zI253rVy6MRnSKNxJtQcRY3xL90MkN6DYGZHI3zBMaF1NcoUQ3Oll+9RBqHb1uIzSTmv9LtQOJbC7Ci/fRsivh0+sBrYwix3GKe8No5yHJTDaZqhqOp8KC6BdmXrFKFaXUUWk7uCLsRPbuAZrmsPjCANBKChIZj/97IBzSJq3pgpymiYRmnxMLG9YbinUGCk5rxbUhJDy/yH+C5U3wP1FQWDL5AtWpNQm0IRz/ys+psCTSKuCObTjY3KhLoCrbUY7ZgIqHRXrTSFHxwfFjcM1fWF8devtJPK2XtM6nAOpcrCXDlVR967qRi6XOY78NJsi95gcsJynMXF2k6gAFFhVFGLz0loz5u0HGoEGF6qOoVgC6cOB6iBb0Ixue66p+p8F+v17VkhUTqGXP6pVptC8JU07z0Ga5VqjmUpvBvuC8wpej4bJiXK+ZHnazfXyfUSipxPVJQvMTjppUKlFUVvv8PIVftrSIRD+Q6DQ7a47wzE9xjaYJk1Fty1v8CYauOLm+fv3Cikjv4lBqVCAP6n/gfZhdXQlm1mfwAAAABJRU5ErkJggg==';

})();