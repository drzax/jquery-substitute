This jQuery plugin will selectively replace strings of text on a page. The search
value can be a substring, regular expression or function. 

## Usage

```javascript
$('selector').substitute([command][, options]);
```

If the <code>command</code> parameter is omitted, the <code>'substitute'</code> command
is assumed (see below).

The following commands are supported:

```javascript
'substitute'		// Performs a substitution.
'undo'				// Undoes a previous the substitution.
```

The following options are available:

```javascript
// Default options exposed so they can be updated globally.
$.fn.substitute.defaults = {
	name: 'substitute',		// A class added to all substituted elements. This can also be used to 'group' substitutions for selective undoing.
	ignoreWhitespace: true	// Change to false to include text nodes which only contain whitespace characters in the substitution. 
}
```

## Feedback, Bug Reports & Contributions 
Support requests and bug reports can be posted to the 
[GitHub issue tracker](https://github.com/drzax/jquery-substitute/issues). If you'd 
like to help improve jQuery.substitute feel free to submit a pull request via GitHub.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.


