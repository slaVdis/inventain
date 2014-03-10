jQuery(document).ready(function() {

	// Header image parallax
	function parallax() {
		if ( $('.header__bg').length ) {
			var scrolled = $(window).scrollTop();
			$('.header__bg').css('top',(scrolled * 0.7) + 'px');
		};
	}
	$(window).scroll(parallax);

	// Header image fade
	function scrollfade() {
		if ( $('.header__bg').length ) {
			var fadeEl = $('.header__bg'),
			fadeParent = $('.header'),
			scrolled = $(window).scrollTop(),
			fadeStart = fadeParent.offset().top,
			fadeEnd = fadeStart + fadeParent.height() - 20,
			opacity = 0;

			
			if ( scrolled <= fadeStart ) {
				opacity = 1;
			} else if ( scrolled <= fadeEnd ) {
				opacity = 1 - scrolled / fadeEnd;
			};

			fadeEl.css( 'opacity', opacity );
		};
	}
	$(window).scroll(scrollfade);

	// Hiding sidebar menu
	function hidemenu() {
		if ( $('.sidemenu').length ) {
			var el = $('.sidemenu__inner'),
				elEnd = el.offset().top + el.height();

			if ( $(window).scrollTop() >= elEnd + 40 ) {
				$('.sidemenu').stop().animate({'width' : 0, 'min-width' : 0}, function() {
					$(this).removeClass('m-active').css({'width' : 0, 'min-width' : 0}, 400, 'easeInCubic');
				});
			};
		};
	}
	$(window).scroll(hidemenu);

	// Showing slidebar menu
	if ( $('.menu-link').length ) {
		$('.menu-link').click(function(e) {
			e.preventDefault();
			if ( $('.sidemenu').hasClass('m-active') ) {
				$('.sidemenu').animate({'width' : 0, 'min-width' : 0}, 400, 'easeInCubic').removeClass('m-active');
			} else {
				$('.sidemenu').animate({'width' : '20%', 'min-width' : 200}, 400, 'easeInCubic').addClass('m-active');
			};
		});
	};

	// Closing sidebar menu
	if ( $('.sidemenu__close').length ) {
		$('.sidemenu__close').click(function(e) {
			e.preventDefault();
			$('.sidemenu').animate({'width' : 0, 'min-width' : 0}, 400, 'easeInCubic').removeClass('m-active');
		});
	};

	// Team description animation
	if ( $('.teamlist__pic').length ) {
		$('.teamlist__pic').click(function(){
			var parentItem = $(this).parents('.teamlist__item'),
				aboutblock = parentItem.find('.teamlist__about');

			$('.teamlist__about').not(aboutblock).fadeOut();
			$('.teamlist__item').not(parentItem).removeClass('m-active');

			if ( parentItem.hasClass('m-active') ) {
				aboutblock.fadeOut();
				parentItem.removeClass('m-active');
			} else {
				aboutblock.fadeIn();
				parentItem.addClass('m-active');
			};	

		});
	};

	// Slider settings & init
	if ( $('.appslider').length ) {
		function doubleSlider2Load(args) {
			$('.doubleSlider-2').iosSlider('goToSlide', args.currentSlideNumber);
			
			// update indicator
			$('.doubleSlider-2 .button').removeClass('selected');
			$('.doubleSlider-2 .button:eq(' + (args.currentSlideNumber-1) + ')').addClass('selected');
		}

		$('.doubleSlider-1').iosSlider({
			scrollbar: true,
			snapToChildren: true,
			desktopClickDrag: true,
			infiniteSlider: true,
			navPrevSelector: $('.doubleSliderPrevButton'),
			navNextSelector: $('.doubleSliderNextButton'),
			scrollbarHeight: '2',
			scrollbarBorderRadius: '0',
			scrollbarOpacity: '0.5',
			onSliderLoaded: doubleSlider2Load,
			onSlideChange: doubleSlider2Load,
			keyboardControls: true
		});
		
		$('.doubleSlider-2 .button').each(function(i) {
			$(this).bind('click', function() {
				$('.doubleSlider-1').iosSlider('goToSlide', i+1);
			});
		});
		
		if ( $('.doubleSlider-2 .button').length > 3 ) {
			$('.doubleSlider-2').iosSlider({
				desktopClickDrag: true,
				snapToChildren: true,
				snapSlideCenter: true,
				infiniteSlider: true
			});
		} else {
			$('.doubleSlider-2').iosSlider();
		};
	};	

});
