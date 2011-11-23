/*
 * jQuery.substitute plugin
 * https://github.com/drzax/jquery-substitute
 *
 * Copyright 2011, Simon Elvery
 * http://elvery.net
 *
 * This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/ 
 */
(function($){
	
	/*
	 * Make error logging easier.
	 */
	var log = function(message){
		if ( window.console && window.console.log ) {
			window.console.log(message);
		}
		$.error(message);
	}
	
	var methods = {
		
		/*
		 * Do the substitutuion
		 */
		substitute : function(search, replacement, _opts) {
			
			var opts = $.extend( {}, $.fn.substitute.defaults || {}, _opts || {} );
			
			/**
			 * This does the actual replacing. It's called recursively over all nodes.
			 */
			var replace = function() {
				if ( this.nodeType == 3 || $.nodeName(this, "br") ) {
					
					if ( opts.ignoreWhitespace && /^\s*$/.test(this.nodeValue) ) return;
					
					var $replacement = $('<span class="' + opts.name + '"></span>').data('original', this.data),
						content = '';
					
					if ( typeof search === 'function' ) { // Function replacement
						content = search.call(this, this.nodeValue, replacement);
					} else { // Plain old String.replace()
						content = this.nodeValue.replace(search, replacement);
					}
					
					this.parentNode.replaceChild($replacement.html(content).get(0), this);
					return;
				}
				$(this).contents().each( replace );
			}
			
			return this.each(function() {
				$(this).contents().each( replace );
			});
		},
		
		/*
		 * Undo a replacement
		 */
		undo : function(_opts) {
			
			var opts = $.extend( {}, $.fn.substitute.defaults || {}, _opts || {} );
			
			return this.each(function(){
				$('span.'+opts.name, this).each(function(){
					var $this = $(this);
					$this.text($this.data('original'));
				});
			});
		}
	}
	
	// The plugin function
	$.fn.substitute = function( method ) {
		if ( methods[method] ) {
			// Remove the first argument (method name) and send on to the requested method.
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			// Initialise the substitution
			return methods.substitute.apply( this, arguments );
		} else {
			log( '[substitute] method ' +  method + ' does not exist' );
			return this;
		}
	}
	
	
	// Default options exposed so they can be updated globally.
	$.fn.substitute.defaults = {
		name: 'substitute',
		ignoreWhitespace: true
	}
})(jQuery);

