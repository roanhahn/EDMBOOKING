// var bodyHeight = $('.body').outerHeight();
// var headerHeight = $('.header').outerHeight();
var footerHeight = $('#footer').outerHeight();
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

setTimeout(function(){
    $('.odometer').html(99);
  }, 2000);

// Lazyload

$("img.lazyload").lazyload();

// var bodyheight = $('.sitewrapper').outerHeight() - $('.header').outerHeight();

// $('.subnav').css("height", bodyheight);

// console.log(bodyheight);

// SHOW HAMBURGER MENU

$('.toggle-subnav').click(function(){
	$('.hamburger').toggleClass("hamburger-close");
	$('#subnav').toggleClass("subnav-active");
	 $('.body').toggleClass("scroll-lock");
	 return false;
	 $('body').attr('scroll','no');
	});

$('.closeCookies').click(function(){
	$('.cookies').fadeToggle("fast");
});

// TOGGLE FILTERS



$('.toggle-filters').click(function(){
	$('#filters').fadeToggle("fast");
	 return false;
});
//  READMORE


$('.readmore').click(function(){
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

$('.toggle-cart').click(function(){
	$('.state-empty').toggleClass("d-block");
	$('.state-filled').toggleClass("d-none");
	return false;
});

// NOTIFICATION
$('.notification').delay(3500).fadeOut("fast");


// SHOW YOUR BOOKING

$('.toggle-yourbooking').click(function(){
	$('.yourbooking').slideToggle(300);
	$('.body').toggleClass("scroll-lock");
	return false;
	$('body').attr('scroll','no');
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
		scrollTop: $("#" + $(this).data('target')).offset().top-50
	}, 1000, 'easeInOutCubic');
});

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
		scrollTop: $("#" + $(this).data('list')).offset().top-50
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

$('.datepicker').datepicker({
	format: "dd/mm/yyyy",
	autoclose: true,
	todayHighlight: true
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

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			// 3. This function creates an <iframe> (and YouTube player)
			//    after the API code downloads.
			var starttime = 40;
			var endtime = 45;

			var player;

			function onYouTubeIframeAPIReady() {
				
				player = new YT.Player('hero-video', {
					videoId: 'gTgP9DRm2RI',
					playerVars: {
						controls: '0',
						start: starttime,
						end: endtime,
						// playlist: 'gTgP9DRm2RI',
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

// RANDOM NUMBERS

var output, started, duration, desired;

// Constants
duration = 10000;
desired = '00';

// Initial setup
output = $('#output');
started = new Date().getTime();

// Animate!
animationTimer = setInterval(function() {
    // If the value is what we want, stop animating
    // or if the duration has been exceeded, stop animating
    if (output.text().trim() === desired || new Date().getTime() - started > duration) {
        clearInterval(animationTimer);
    } else {
        console.log('animating');
        // Generate a random string to use for the next animation step
        output.text(
            ''+
            Math.floor(Math.random() * 10)+
            Math.floor(Math.random() * 10)
        );
    }
}, 100);

