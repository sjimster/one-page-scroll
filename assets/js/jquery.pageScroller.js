$.fn.pageScroller = function( options ){

	var settings = $.extend({
		nav: 				$(this),
		links: 				$(this).find('a'),
		navActiveClass:		'active',
		scrollContainer: 	$('html, body'),
		scrollSpeed:		1500,
		section: 			$('section'),
		navHeight: 			$(this).outerHeight()
	}, options);

	settings.links.each(function(){
		var link = $(this),
			href = link.attr('href'),
			target = $(href);

		link.on('click', function( e ){
			e.preventDefault();
			settings.links.removeClass(settings.navActiveClass);
			link.addClass(settings.navActiveClass);
			settings.scrollContainer.stop().animate({
				scrollTop: target.offset().top - settings.navHeight
			}, settings.scrollSpeed);
		});

	});

	$(window).on('scroll', function(){
		var wScroll = $(window).scrollTop() + settings.navHeight;
		settings.section.each( function( index ) {
			var id = $(this).attr('id'),
				top = $(this).offset().top,
				secHeight = $(this).outerHeight();
			if ( top <= wScroll && (top  + secHeight) > wScroll) {
				settings.links.removeClass(settings.navActiveClass);
				settings.nav.find('a[href="#'+ id +'"]').addClass(settings.navActiveClass);
			}
		});
	});
};
