This jQuery plugin will selectively replace strings of text on a page. The search
value can be a substring, regular expression or function. 

## Usage

```javascript
$(selector).substitute(search, replace[, options]);
```

**search** string, regular expression or function used to identify strings to
substitute. If a string or regular expression is passed, the substitution will be
performed using javascript's [String.replace()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/replace) 
function. If a function is passed it will be called with the following arguments:

* **text** The text for the function to act upon.
* **replace** The replacement value passed to the jQuery.substitute function. There's no reason this can't be a function if necessary.

**replace** string or function used for substitution for substrings found by the
<code>search</code> parameter. 

### Options

```javascript
// Default options exposed so they can be updated globally.
$.fn.substitute.defaults = {
	name: 'substitute',		// A class added to all substituted elements. This can also be used to 'group' substitutions for selective undoing (see below).
	ignoreWhitespace: true	// Change to false to include text nodes which only contain whitespace characters in the substitution. 
}
```

## Undoing a substitution
```javascript
$(selector).substitute('undo'[, options]);
```

There's no reason the <code>selector</code> needs to be the same as when the 
original substitution was performed. Additionally, the <code>name</code> parameter 
can be used here to target a specific 'group' of replaced elements.

## Feedback, Bug Reports & Contributions 
Support requests and bug reports can be posted to the 
[GitHub issue tracker](https://github.com/drzax/jquery-substitute/issues). If you'd 
like to help improve jQuery.substitute feel free to submit a pull request via GitHub.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.


