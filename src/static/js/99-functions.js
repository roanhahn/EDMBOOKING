

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
