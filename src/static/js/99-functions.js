

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

