

// Lazyload

$("img.lazyload").lazyload();

// var bodyheight = $('.sitewrapper').outerHeight() - $('.header').outerHeight();

// $('.subnav').css("height", bodyheight);

// console.log(bodyheight);

// SHOW HAMBURGER MENU

$('.toggle-subnav').click(function(){
	 $('#subnav').toggleClass("subnav-active");
	 $('.body, .html').toggleClass("scroll-lock");
	 // $('body, .html').attr('scroll','no');
 });

// SHOW YOUR BOOKING

$('.toggle-yourbooking').click(function(){
	 $('.yourbooking').slideToggle(300);
	 $('.body, .html').toggleClass("scroll-lock");
	 // $('body, .html').attr('scroll','no');
 });

// CUSTOM SELECT

$(function() {
	$('select').selectric();
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
});