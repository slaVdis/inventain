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
	// $(window).scroll(scrollfade);

	// Showing sidebar menu
	if ( $('.menu-link').length ) {
		trackScroll = false;

		$('.menu-link').click(function(e) {
			e.preventDefault();
			if ( $('.sidemenu').hasClass('m-active') ) {
				trackScroll = false;
				$('.sidemenu').animate({'width' : 0, 'min-width' : 0}, 400, 'easeInCubic').removeClass('m-active');
				$('.wrapper').removeClass('menu-showed');
			} else {
				$('.sidemenu').animate({'width' : '20%', 'min-width' : 200}, 400, 'easeInCubic').addClass('m-active');
				$('.wrapper').addClass('menu-showed');
				trackScroll = true;
			};
		});

		// Hiding sidebar menu by scroll
		function hidemenu() {
			if ( $('.sidemenu').length ) {
				var el = $('.sidemenu__inner'),
					elEnd = el.offset().top + el.height();

				if ( trackScroll ) {
					if ( $(window).scrollTop() >= elEnd + 40 ) {
						trackScroll = false;
						$('.sidemenu').stop().animate({'width' : 0, 'min-width' : 0}, 400, 'easeInCubic', function() {
							$(this).removeClass('m-active').css({'width' : 0, 'min-width' : 0});
							$('.wrapper').removeClass('menu-showed');
						});
					};
				};
			};
		}
		$(window).scroll(hidemenu);
	};

	// Closing sidebar menu
	if ( $('.sidemenu__close').length ) {
		$('.sidemenu__close').click(function(e) {
			e.preventDefault();
			$('.sidemenu').animate({'width' : 0, 'min-width' : 0}, 400, 'easeInCubic').removeClass('m-active');
			$('.wrapper').removeClass('menu-showed');
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
				$.scrollTo( aboutblock, 200 );
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

	// Custom selects
	if ( $('.form__sel').length ) {
		$('.form__sel').ikSelect();
	};

	// Maps
	if ( $('.mapsblock').length ) {
		var activeLink = $('.mapnav__item').first().find('a');

		if ( $('.mapnav__item.m-active').length ) {
			activeLink = $('.mapnav__item.m-active').find('a');
		};

		var activeMap = $(activeLink.attr('href'));
		$('.map').removeClass('m-active')
		
		activeMap.addClass('m-active');

		$('.mapnav__item a').click(function(e){
			e.preventDefault();
			$('.mapnav__item').removeClass('m-active')
			$(this).parents('.mapnav__item').addClass('m-active');

			activeMap.css({'z-index' : 1});

			activeLink = $(this);
			activeMap = $(activeLink.attr('href'));

			activeMap.css({'z-index' : 3}).animate({'top' : 0}, function(){
				$(this).addClass('m-active');
				$('.map').not(activeMap).css({'top' : '100%'});
			});
		});

	};

	// Positions accordion
	if ( $('.positions').length ) {
		$('.position__title').click(function(){
			var parentHeader = $(this).parents('.positions__header'),
				content = parentHeader.next('.positions__content');

			$('.positions__content').not(content).slideUp(700);
			$('.positions__header').not(parentHeader).removeClass('m-active');

			if ( parentHeader.hasClass('m-active') ) {
				parentHeader.removeClass('m-active');
				content.stop().slideUp(700)
			} else {
				parentHeader.addClass('m-active');
				content.stop().slideDown(700);
			};
		});
	};

	// Popup
	if ( $('.popup').length ) {
		$('a[href="http://letterpopup"]').click(function(e){
			e.preventDefault();

			$('.popup').fadeIn();
			setTimeout(function() { $('.popup__block').animate({ 'top' : 100 }, 1000); }, 50)
		});

		$('.teamlist__join').click(function(e){
			e.preventDefault();

			$('.popup').fadeIn();
			setTimeout(function() { $('.popup__block').animate({ 'top' : 100 }, 1000); }, 50)
		});
		$('.popup__close').click(function(e){
			e.preventDefault();

			$('.popup__block').animate({ 'top' : '-100%' }, 500);
			setTimeout(function() { $('.popup').fadeOut(); }, 100)
		});
		$('.popup__overlay').click(function(e){
			e.preventDefault();

			$('.popup__block').animate({ 'top' : '-100%' }, 500);
			setTimeout(function() { $('.popup').fadeOut(); }, 150)
		});
	};

	// Images popups
	if ( $('.pagegal__list' ).length) {
		$('.pagegal__list').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeBtnInside: false,
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			  },
			retina: {
				ratio: 2,		

				replaceSrc: function(item, ratio) {
			  		return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
				}
			},
			midClick:true
		});
	};

	// Read more
	if ( $('.article__readmore').length ) {
		$('.article__readmore').click(function(e){
			e.preventDefault();
			$(this).prev('.m-hidden').slideDown();
			$(this).animate({ 'opacity' : 0 });
		});
	};

	// Slider
	if ( $('.mainslider').length ) {
		var slidesize = function(){
			var height = $(window).height();

			if ( height < 565 ) { height = 565 };
			$('.mainslider').css({ 'height' : height });
		}
		slidesize();
		$(window).resize(function() {
			slidesize();
			app_activate();
			career_activate();
		});

		// App slider positions
		var app_pencil = function(){
			if ( $('#pencil_s').length ) {
				var pencil = $('#pencil_s'),
					height = pencil.height() - 2,
					width = pencil.width() - 2;
				$('#pencil_s').css({ 'top' : -height, 'right' : -width });
			};
		};

		var app_pencil_m = function(){
			$('#app_pencil_m').css({ 'right' :  57.25*$('#app_ipad > img').width()/100 });
		};
		var app_ruler_round = function(){
			$('#app_ruler_round').css({ 'right' :  26*$('#app_ipad > img').width()/100 });
		};
		var app_hand_right = function(){
			$('#app_hand_right').css({
				'left' :  $('#app_scheme img').width()/1.15,
				'top' :  $('#app_scheme img').height()/2 - $('#app_hand_right img').height()/6.75
			});
		};

		var app_activate = function(){
			app_pencil();
			app_pencil_m();
			app_ruler_round();
			app_hand_right();
		};

		var career_keyboard = function(){
			var padleft = ($('#career_keyboard').width() - $('#career_keyboard img').width()) / 2;
			$('#career_mouse').css({ 'left' :  padleft + $('#career_keyboard img').width() + 30 });
		};
		career_keyboard();
		var career_ipad_hotspot = function(){
			$('#career_ipad_hotspot').css({
				'width' :  $('#career_ipad img').width() * 87.23 / 100,
				'height' :  $('#career_ipad img').height() * 79.18 / 100,
				'left' :  $('#career_ipad img').width() * 5.1 / 100,
				'top' :  $('#career_ipad img').height() * 11.43 / 100 
			});
		};
		career_ipad_hotspot();
		var career_iphone_hotspot = function(){
			$('#career_iphone_hotspot').css({
				'width' :  $('#career_iphone img').width() * 82.14 / 100,
				'height' :  $('#career_iphone img').height() * 72.93 / 100,
				'left' :  $('#career_iphone img').width() * 7.14 / 100,
				'top' :  $('#career_iphone img').height() * 13.3 / 100 
			});
		};
		career_iphone_hotspot();

		var career_activate = function(){
			career_keyboard();
			career_ipad_hotspot();
			career_iphone_hotspot();
		};

		$('.mainslider').find('.slide').each(function(){
			$('#slidenav_list').append('<li>');
		});
		$('#slidenav_list li').first().addClass('m-active');
		$('.mainslider .slide').first().addClass('m-active');
		$('#slidenav_list li').click(function(){
			var i = $(this).index(),
				target = $('.mainslider').find('.slide').eq(i);

			$('#slidenav_list li').not(this).removeClass('m-active');
			$(this).addClass('m-active');

			$('.mainslider .slide').not(target).fadeOut().css({ 'z-index' : 1 });
			target.css({ 'z-index' : 2 }).fadeIn();

			if ( target.hasClass('m-light') ) {
				$('.maincontainer').addClass('m-light');
			} else {
				$('.maincontainer').removeClass('m-light');
			};
			app_activate();
			career_activate();
		});
	};
});
