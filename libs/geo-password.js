/**
 * @description A password strength analyzer
 * @author George Liu
 * @version 1.0.0
 */
 
 
(function () {
	
	/**
	 * Awards points to bigger passwords
	 * @param {String} password
	 * @returns {Number} points awarded
	 */
	var awardLength = function (password) {
		// y=1.1\left(\frac{1}{1+e^{-.5\left(x-10\right)}}\right)-0.1
		return (1.1 * (1 / (1 + Math.pow(Math.E, (0-0.5) * (password.length - 10)))) - 0.1) * 0.2;
	}
	
	/**
	 * Awards points to more symbols
	 * @param {String} password
	 * @returns {Number} points awarded
	 */
	var awardSymbols = function (password) {
		// y=\frac{1}{1+e^{-2\left(x\ -1.5\right)}}
		
		var symbols = /[ !-/:-@\[-`{-~]/g;
		var numSymbols = (password.match(symbols) || []).length;
		
		return (1 / (1 + Math.pow(Math.E, (0-2) * (numSymbols - 1.5)))) * 0.15;
	}
	
	/**
	 * Awards points to more numbers
	 * @param {String} password
	 * @returns {Number} points awarded
	 */
	var awardNumbers = function (password) {
		// y=\frac{1}{1+e^{-2\left(x\ -1.5\right)}}
		
		var symbols = /[0-9]/g;
		var numSymbols = (password.match(symbols) || []).length;
		
		return (1 / (1 + Math.pow(Math.E, (0-2) * (numSymbols - 1.5)))) * 0.15;
	}
	
	/**
	 * Awards points to more upperCase
	 * @param {String} password
	 * @returns {Number} points awarded
	 */
	var awardUpperCase = function (password) {
		// y=\frac{1}{1+e^{-2\left(x\ -1.5\right)}}
		
		var symbols = /[A-Z]/g;
		var numSymbols = (password.match(symbols) || []).length;
		
		return (1 / (1 + Math.pow(Math.E, (0-2) * (numSymbols - 1.5)))) * 0.25;
	}
	
	/**
	 * Awards points to more lowerCase
	 * @param {String} password
	 * @returns {Number} points awarded
	 */
	var awardLowerCase = function (password) {
		// y=\frac{1}{1+e^{-2\left(x\ -1.5\right)}}
		
		var symbols = /[a-z]/g;
		var numSymbols = (password.match(symbols) || []).length;
		
		return (1 / (1 + Math.pow(Math.E, (0-2) * (numSymbols - 1.5)))) * 0.25;
	}
	
	/**
	 * Sums everything up
	 * @param {Array} array of functions to evaluate
	 * @returns {Number} the sum
	 */
	var sum = function (arr,password) {
		var out = 0;
		
		for (var i = 0; i < arr.length; i++) {
			out += arr[i](password);
		}
		
		return out
	}
	
	/**
	 * Determines password strength
	 * @param {String} password
	 * @returns {Number} strength b/w 0 and 1
	 */
	var geoPassStrength = function (password) {
		return sum([
			awardLength,
			awardSymbols,
			awardNumbers,
			awardUpperCase,
			awardLowerCase
		],password) * 0.5 + entropy(password) * 0.00625;
	}
	
	var entropy = function (password) {
		var chars = password.match(/[\s\S]/g);
		var uniqueChars = [];
		for (var i = 0; i < chars.length; i++) {
			if (uniqueChars.indexOf(chars[i]) === -1) {
				uniqueChars.push(chars[i]);
			}
		}
		
		return Math.log2(Math.pow(uniqueChars.length,password.length));
	}

	
	window["geoPassStrength"] = geoPassStrength;
})();


