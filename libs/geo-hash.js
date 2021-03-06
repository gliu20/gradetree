/**
 * @description A custom implementation of a sponge-based hash function
 * @author George Liu
 * @version 1.0.0
 */
 
 
(function () {
	
	/**
	 * Converts an array of characters into an array of numbers based on the
	 * alphabet
	 * Note: modifies in place
	 * @param {Array} stringArr
	 * @param {Array} alphabetArr
	 * @returns {Array} array of numbers
	 */
	var alphaToNum = function (stringArr,alphabetArr) {
	
		for (var i = 0; i < stringArr.length; i++) {
		
			// modify array in place
			// replace with indexOf character
			stringArr[i] = alphabetArr.indexOf(stringArr[i]);
		}
		
		// stringArr is no longer an array of characters;
		// it is an array of numbers
		return stringArr;
	}
	
	/**
	 * Converts an array of numbers into an array of characters based on the
	 * alphabet
	 * Note: modifies in place
	 * @param {Array} numArr
	 * @param {Array} alphabetArr
	 * @returns {Array} array of characters
	 */
	var numToAlpha = function (numArr,alphabetArr) {
	
		for (var i = 0; i < numArr.length; i++) {
		
			// modify array in place
			// replace with character based on index
			numArr[i] = alphabetArr[numArr[i]];
		}
		
		// numArr is no longer an array of numbers;
		// it is an array of characters
		return numArr;
	}
	
	/**
	 * Mixes the inputs.
	 * Side effect: output is smaller by 1
	 * Note: modifies in place
	 * @param {Array} numArr
	 * @param {Number} mod - modulus for determining size of output numbers
	 */
	var mix = function (numArr,mod) {
		
		// this is basically a fancy version of calculating the distance
		// b/w two numbers on a number line so it is (numArr.length - 1)
		for (var i = 0; i < (numArr.length - 1); i++) {
			
			// (i * numArr[i] + i) is due to a couple of reasons
			//   1. (i * numArr[i]) is used to create "mixing" and is inspired
			//      by how linear congruentional RNGs work
			//   2. (... + i) is to prevent an input of 0 from staying at 0
			numArr[i] = 
			(Math.abs(numArr[i + 1] - numArr[i]) + (i * numArr[i])) % mod;
			
		}
		
		// delete the last item because this was never modified by mixing
		// algorithm so it should not be kept
		numArr.pop();
	}
	
	/**
	 * Adds padding of size (size)
	 * Note: modifies in place
	 * @param {Array} arr
	 * @param {Number} size
	 */
	var pad = function (arr,size) {
		for (var i = 0; i < size; i++) {
			arr.push((arr[i] * i) || (i * arr.length));
		}
	}
	
	/**
	 * Gets block
	 * Note: if padding is needed, arr is modified in place
	 * @param {Array} arr
	 * @param {Number} position
	 * @param {Number} size - size of block
	 * @returns {Array} the block
	 */
	var block = function (arr,position,size) {
		var endPosition = position + size;
		
		if (endPosition > arr.length) {
			pad(arr,size);
		}
		
		return arr.slice(position,endPosition);
	}
	
	/**
	 * Adds something to an array
	 * Note: modifies in place
	 * @param {Array} inputArr - array that receives the added array
	 * @param {Number} addArr - array to be added
	 */
	var arrPush = function (inputArr,addArr) {
		for (var i = 0; i < addArr.length; i++) {
			inputArr.push(addArr[i]);
		}
	}
	
	/**
	 * Mixes array until it is small enough
	 * Note: modifies in place
	 * @param {Array} inputArr
	 * @param {Number} size - size of output array
	 */
	var mixToSize = function (inputArr,size,mod) {
		while (inputArr.length > size) {
			mix(inputArr,mod)
		}
	}
	
	/**
	 * Hash function
	 * Note: modifies in place
	 * @param {Array} inputArr - input array
	 * @param {Array} inAlpha - input alphabet
	 * @param {Array} outAlpha - output alphabet
	 * @param {Number} blockSize - size of blocks
	 * @param {Number} penalty - should be at least blockSize * 16 for security
	 * @returns {String} the hash
	 */
	var geoHash = function (inputArr,inAlpha,outAlpha,blockSize,penalty) {
		var sponge = [];
		var extract = [];
		
		var spongeSize = blockSize * 16;
		var extractSize = blockSize * 4;
		var mod = outAlpha.length;
		var totalRuns = inputArr.length + blockSize;
		
		pad(sponge,spongeSize);
		pad(extract,extractSize);
		
		alphaToNum(inputArr,inAlpha);
		
		for (var i = 0; i < totalRuns; i += blockSize) {
			
			// soak sponge
			arrPush( // add input block to sponge
				sponge,
				block(inputArr,i,blockSize)
			);
			pad(sponge,penalty); // force more iterations by padding sponge
			mixToSize(sponge,spongeSize,mod); // mix sponge
			
			// squeeze sponge
			arrPush( // add sponge block to extract
				extract,
				block(sponge,0,blockSize)
			)
			pad(extract,penalty); // force more iterations by padding extract
			mixToSize(extract,extractSize,mod); // mix extract
			
		}
		
		numToAlpha(extract,outAlpha);
		
		return extract.join("");
	}
	
	/**
	 * Super Hash function
	 * Note: modifies in place
	 * @param {Array} inputArr - input array
	 * @param {Array} inAlpha - input alphabet
	 * @param {Array} outAlpha - output alphabet
	 * @param {Number} blockSize - size of blocks
	 * @param {Number} penalty - should be at least blockSize * 16 for security
	 * @returns {String} the hash
	 */
	var geoSuperHash = function (inputArr,inAlpha,outAlpha,blockSize,penalty) {		
		var sh1 = geoHash(inputArr.slice(0),inAlpha,outAlpha,blockSize,penalty).split("");
		var sh2 = geoHash(inputArr.slice(0).reverse(),inAlpha,outAlpha,blockSize,penalty).split("");
		var sh3 = geoHash(inputArr.slice(0),sh1,sh2,blockSize,penalty).split("");
		
		return geoHash(sh3,inAlpha,outAlpha,blockSize,penalty);
	}
	
	window["geoHash"] = geoHash;
	window["geoSuperHash"] = geoSuperHash;
})();
