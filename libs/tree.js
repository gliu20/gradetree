/**
 * @description A custom library for dealing with trees
 * @author George Liu
 * @version 1.0.0
 */

(function () {
	var Tree = {};
	
	/**
	 * Gets branch
	 * @param {Array} tree - array of arrays
	 * @param {Number} branchId
	 * @returns {Array} branch
	 */
	Tree.getByBranchId = function (tree, branchId) {
		return tree[branchId];
	}
	
	/**
	 * Adds an item to the tree
	 * @param {Array} tree - array of arrays
	 * @param {Array} position - array of branchIds
	 * @param {Object} child - stuff to add
	 */
	Tree.appendChildAtPosition = function (tree,position,child) {
		var childObj = Tree.getByPosition(tree,position);
		
		// merge objects
		for (var prop in child) {
			childObj[prop] = child[prop];
		}
	}
	
	/**
	 * Removes an item from the tree
	 * @param {Array} tree - array of arrays
	 * @param {Array} position - array of branchIds
	 * @param {Object} delObject - item that placeholds and counts as deleted
	 */
	Tree.removeChildAtPosition = function (tree,position,delObject) {
		position = position.slice(0);
		
		var delIndex = position.pop();
		Tree.getByPosition(tree,position).__tree[delIndex] = delObject;
	}
	
	/**
	 * Gets leaf / branch / subtree at position
	 * @param {Array} tree - array of arrays
	 * @param {Array} position - array of branchIds
	 * @returns {Array} leaf / branch / subtree
	 */
	Tree.getByPosition = function (tree, position) {
		var subtree = {__tree:tree};
		
		for (var i = 0; i < position.length; i++) {
			
			// make sure branches exists
			if (!subtree.__tree) {
				subtree.__tree = [];
			}
			
			// make sure subtree exists
			if (!subtree.__tree[position[i]]) {
				subtree.__tree[position[i]] = {};
			}
			
			// recursively get subtrees
			subtree = subtree.__tree[position[i]];
		}
		
		return subtree;
	}
	
	/**
	 * Iterates over entire tree
	 * @param {Array} tree - array of arrays
	 * @param {Function} callback - with param position
	 */
	Tree.iterate = function (tree, callback, position) {
		
		var subtree;
		
		position = position || [];
		
		for (var i = 0; i < tree.length; i++) {

			// clear old position
			position.pop();
			
			// add new pos
			position.push(i);

			// call callback
			callback(position.slice(0));
			
			
			
			
			subtree = Tree.getByBranchId(tree, i).__tree;
			
			if (subtree != null) {
				// recurse deeper into tree
				Tree.iterate(subtree, callback, position.concat(i));
			}
		}
		
	}
	
	/**
	 * Returns positions of every node
	 * @param {Array} tree - array of arrays
	 * @returns {Array} array of positions
	 */
	Tree.getPositions = function (tree) {
		var positions = [];
		
		Tree.iterate(tree, function (position) {
			// need to make copy of each position item
			positions.push(position.slice(0));
		});
		
		return positions;
	}
	
	///**
	// * Indexes tree
	// * @param {Array} tree 
	// */
	//Tree.index (tree) {
	//	var positions = [];
	//	
	//	Tree.iterate(tree, function (position) {
	//		// need to make copy of each position item
	//		positions.push(position.slice(0));
	//	});
	//	
	//	return positions;
	//}
	
	/**
	 * Returns maximum depth of tree
	 * @param {Array} tree - array of arrays
	 * @returns {Number} maximum depth
	 */
	Tree.getMaximumDepth = function (tree) {
		var positions = Tree.getPositions(tree);
		var bestLength = 0;
		
		for (var i = 0; i < positions.length; i++) {
			if (bestLength < positions[i].length) {
				bestLength = positions[i].length;
			}
		}
		
		return bestLength;
	}
	
	/**
	 * Gets nodes at depth
	 * @param {Array} tree - array of arrays
	 * @param {Number} depth
	 * @returns {Array} array of nodes
	 */
	Tree.getNodesAtDepth = function (tree, depth) {
		var positions = Tree.getPositions(tree);
		var nodes = [];
		
		for (var i = 0; i < positions.length; i++) {
			if (positions[i].length === depth) {
				nodes.push(positions[i].slice(0));
			}
		}
		
		return nodes;
	}
	
	window.Tree = Tree;
	///**
	// * Gets leaf nodes
	// * @param {Array} tree - array of arrays
	// * @returns {Array} array of positions of leaf nodes
	// */
	//Tree.getLeafNodes (tree) {
	//	var positions = Tree.getPositions(tree);
	//	
	//	for (var i = 0; i < positions.length; i++) {
	//		
	//	}
	//}
})()
