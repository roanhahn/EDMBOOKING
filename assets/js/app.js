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


// Lazyload

$("img.lazyload").lazyload();

// var bodyheight = $('.sitewrapper').outerHeight() - $('.header').outerHeight();

// $('.subnav').css("height", bodyheight);

// console.log(bodyheight);

// SHOW HAMBURGER MENU

$('.toggle-subnav').click(function(){
	$('.hamburger').toggleClass("hamburger-close");
	$('#subnav').toggleClass("subnav-active");
	 // $('.body, .html').toggleClass("scroll-lock");
	 return false;
	 // $('body, .html').attr('scroll','no');
	});

//  READMORE


$('.readmore').click(function(){
	console.log("bla");
	$(this).closest('.room-content').find('.room-info').toggleClass("room-info--active");
	 // $('body, .html').attr('scroll','no');
	});


// NOTIFICATION
$('.notification').delay(3500).fadeOut("fast");


// SHOW YOUR BOOKING

$('.toggle-yourbooking').click(function(){
	$('.yourbooking').slideToggle(300);
	return false;
	 // $('.body, .html').toggleClass("scroll-lock");
	 // $('body, .html').attr('scroll','no');
	});


// GO BACK
function goBack() {
	window.history.back();
	return false;
}

// CUSTOM SELECT

$(function() {
	$('select').selectric();
});

// SCROLL HEADER

var headerheight = $(".header").outerHeight();

console.log(headerheight);

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
		scrollTop: $("#" + $(this).data('list')).offset().top-headerheight
	}, 1000, 'easeInOutCubic');
});

$(".info-list-item").click(function() {

	var question = $(this);
	var question_active = $(question).find(".info-list-answer");

	if( $(question).find(".info-list-question").hasClass("active") ){
		$(".info-list-answer").slideUp(500, 'easeOutCubic');
		$(".info-list-question").removeClass("active");
	} else{
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
		items:1,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
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
		animateOut: 'slideOutLeft',
		animateIn: 'slideInRight',
		autoplay:true,
		autoplayTimeout:5000,
		loop: true,
		autoplayHoverPause:true,
		responsive: {
			0: {
				items: 1
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

$('*[data-type="toggle"]').click(function()
{
	var toggletarget = $(this).data('target');
	$(toggletarget).fadeToggle("fast");
});

$('*[data-type="slidetoggle"]').click(function()
{

	var toggletarget = $(this).data('target');
	$(toggletarget).slideToggle("fast");

	console.log(toggletarget + "blaat");
});


// DATEPICKER

$('.date').datepicker({
	format: "dd/mm/yyyy",
	autoclose: true,
	todayHighlight: true
});


// YOUTUBE VIDEO

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			// 3. This function creates an <iframe> (and YouTube player)
			//    after the API code downloads.
			var starttime = 120;
			var endtime = 128;

			var player;

			function onYouTubeIframeAPIReady() {
				
				player = new YT.Player('hero-video', {
					videoId: '1ujOdLRl-Ac',
					playerVars: {
						controls: '0',
						start: starttime,
						end: endtime,
						// playlist: '1ujOdLRl-Ac',
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
				if (event.data == YT.PlayerState.ENDED && done){
					restartVideoSection();
				}
	// event.target.setVolume(0);
}

function vidRescale(){

	var w = $('.videowrapper').outerWidth()+200;
	var h = $('.videowrapper').outerHeight()+200;

	if (w/h > 16/9){
		$('.videoplayer').css({
			'width': w +'px',
			'height': w/16*9 +'px'
		})
		// $('.video-background .videoplayer').css({'left': '0px'});
	} else {
		$('.videoplayer').css({
			'width': h/9*16 +'px',
			'height': h +'px'
		})
		// $('.video-background .videoplayer').css({'left': -($('.video-background').outerWidth()-w)/2});
	}
}

vidRescale();

// FADEIN VIDEO
setTimeout(function() {
	$('#hero-video').addClass('animated fadeIn');
}, 1500);
