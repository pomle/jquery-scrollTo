/*
	jQuery plugin for scrolling to reveal a certain element.

	Author:
		Pomle
	Email:
		pontus.alexander@gmail.com

	Licensed under:
		Kopimi, no rights reserved

	Project home:
		https://github.com/pomle/jquery-scrollTo

	Version:
		Alpha

	Usage:
		$('element.class').scrollTo({margin_bottom: 20});
*/

(function( $ ){

	var defaultSettings = {
		'margin_top': 0,
		'margin_bottom': 0,
		'margin_left': 0,
		'margin_right': 0
	};

	$.fn.scrollTo = function(method)
	{
		var settings = {};

		var methods = {
			'init': function(userOptions) {

				var settings = $.extend({}, defaultSettings, userOptions);

				var w = $(window);
				var viewport = {
					'top': w.scrollTop(),
					'bottom': w.scrollTop() + w.height(),
					'left': w.scrollLeft(),
					'right': w.scrollLeft() + w.width(),
					'height': w.height(),
					'width': w.width()
				};

				var i = $(this).eq(0);
				var element = {
					'top': i.offset().top,
					'bottom': i.offset().top + i.height(),
					'left': i.offset().left,
					'right': i.offset().left + i.width(),
					'height': i.height(),
					'width': i.width()
				};


				if (element.bottom > (viewport.bottom - settings.margin_bottom)) {
					w.scrollTop(element.top - viewport.height + element.height + settings.margin_bottom);
				}
				else if (element.top < (viewport.top + settings.margin_top)) {
					w.scrollTop(element.top - settings.margin_top);
				}

				if (element.right > (viewport.right - settings.margin_right)) {
					w.scrollLeft(element.bottom - viewport.width + element.width + settings.margin_right);
				}
				else if (element.left < (viewport.left + settings.margin_left)) {
					w.scrollLeft(element.left - settings.margin_left);
				}
			}
		};

		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.dropUpload' );
		}
	};

	return this;

})( jQuery );
