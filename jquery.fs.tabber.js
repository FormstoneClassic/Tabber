/*
 * Tabber [Formstone Library]
 * @author Ben Plum
 * @version 0.1.0
 *
 * Copyright © 2013 Ben Plum <mr@benplum.com>
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

if (jQuery) (function($) {
	
	// Public Methods
	var pub = {
		
		// Destroy
		destroy: function(index) {
			return $(this).each(function(i) {
				$(this).removeClass("active")
					   .off(".tabber")
					   .data("tabber", null);
			});
		},
		
		// Select tab
		select: function(index) {
			return $(this).each(function(i) {
				var data = $(this).data("tabber");
				_set(data, index);
			});
		}
	};
	
	// Initalize
	function _init() {
		return $(this).each(_build);
	}
	
	// Build
	function _build() {
		var $tabber = $(this),
			data = {
				$tabber: $tabber,
				$menu: $tabber.find(".tabber-tabs"),
				$menuItems: $tabber.find(".tabber-tab"),
				$content: $tabber.find(".tabber-contents"),
				$contentItems: $tabber.find(".tabber-content")
			};
		
		$tabber.addClass("active")
			   .on("click.tabber", ".tabber-tab", data, _onClick)
			   .data("tabber", data);
	}
	
	// Handle click
	function _onClick(e) {
		e.preventDefault();
		e.stopPropagation();
		
		var $target = $(this),
			data = e.data,
			index = data.$menuItems.index($target);
		
		_set(data, index);
	}
	
	// Set Active Tab
	function _set(data, index) {
		if (!data.$menuItems.eq(index).hasClass("active")) {
			data.$menuItems.filter(".active").removeClass("active");
			data.$menuItems.eq(index).addClass("active");
			
			data.$contentItems.filter(".active").removeClass("active");
			data.$contentItems.eq(index).addClass("active");
		}
	}
	
	$.fn.tabber = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return _init.apply(this, arguments);
		}
		return this;
	};
})(jQuery);	