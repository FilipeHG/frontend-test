$(document).ready(function() {

	$('.slider-nav').slick({
		dots: true,
		infinite: true,
		prevArrow: false,
		nextArrow: false,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true
		
  		/*
		responsive: [
  			{
  				breakpoint: 990,
  				settings: {
	  				slidesToShow: 3,
	  				slidesToScroll: 3,
	  			}					
  			},
  			{
  				breakpoint: 660,
  				settings: {
	  				slidesToShow: 2,
	  				slidesToScroll: 2,  					
  				}
  			},
  			{
  				breakpoint: 480,
  				settings: {
	  				slidesToShow: 1,
	  				slidesToScroll: 1,  					
  				}
  			}
  		]
		*/
	});

});
