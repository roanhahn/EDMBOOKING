

// Lazyload

$("img.lazyload").lazyload();

// var bodyheight = $('.sitewrapper').outerHeight() - $('.header').outerHeight();

// $('.subnav').css("height", bodyheight);

// console.log(bodyheight);

// SHOW HAMBURGER MENU

$('.toggle-subnav').click(function(){
	 $('.hamburger').toggleClass("hamburger-close");
	 $('#subnav').toggleClass("subnav-active");
	 $('.body, .html').toggleClass("scroll-lock");
	 // $('body, .html').attr('scroll','no');
 });

//  READMORE


$('.readmore').click(function(){
	console.log("bla");
	$(this).closest('.room-content').find('.room-info').toggleClass("room-info--active");
	 // $('body, .html').attr('scroll','no');
 });
// SHOW YOUR BOOKING

$('.toggle-yourbooking').click(function(){
	 $('.yourbooking').slideToggle(300);
	 $('.body, .html').toggleClass("scroll-lock");
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

// DATEPICKER

$('.input-group.arrival').datepicker({
	format: "dd/mm/yyyy",
	autoclose: true,
	todayHighlight: true
});
