'use strict';

var getNonMatcher = function (container) {
	if (typeof container === 'string') {
		return function (el) {
			return el && el !== document && !el.matches(container);
		};
	} else {
		return function (el) {
			return el && el !== document && el !== container;
		};
	}
};

module.exports = function (el, container) {
	var doesntMatch = getNonMatcher(container);
	while (doesntMatch(el)) {
		el = el.parentNode;
	}
	return !el || el === document;
};
