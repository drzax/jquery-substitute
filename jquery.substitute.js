/*!
 * jQuery.substitute plugin
 * https://github.com/drzax/jquery-substitute
 *
 * © Simon Elvery
 * http://elvery.net
 *
 * This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/ 
 */


(function (definition) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery'], definition);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = definition;
	} else {
		// Browser globals
		definition(jQuery);
	}
}(function($){
	
	/*
	 * Make error logging easier.
	 */
	var log = function(message){
		if ( window.console && window.console.log ) {
			window.console.log(message);
		}
		$.error(message);
	};
	
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
				if ( this.nodeType === 3 || $.nodeName(this, "br") ) {
					
					// Get outa here if there's nothing to do
					if ( opts.ignoreWhitespace && /^\s*$/.test(this.nodeValue) ) {
						return;
					}
					
					var span = document.createElement('span');
					span.className = opts.name;
					span.setAttribute('data-original', this.nodeValue);
					
					if ( typeof search === 'function' ) { // Function replacement
						span.innerHTML = search.call(this, this.nodeValue, replacement);
					} else { // Plain old String.replace()
						span.innerHTML = this.nodeValue.replace(search, replacement);
					}
					if (span.innerHTML !== this.nodeValue) {
						this.parentNode.replaceChild(span, this);
					}
				} else {
					$(this).contents().each( replace );
				}
			};
			
			return this.each(function() {
				$(this).contents().each( replace );
			});
		},
		
		/*
		 * Undo a replacement
		 * 
		 * @TODO: Return the DOM to exactly how it was rather than leaving all 
		 * these span tags lying around.
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
	};
	
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
	};
	
	
	// Default options exposed so they can be updated globally.
	$.fn.substitute.defaults = {
		name: 'substitute',
		ignoreWhitespace: true
	};
}));

