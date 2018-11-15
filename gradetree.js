var testTree = [
  {
    name: "Quarter 1",
    pointsTotal: 100,
    scores: [
      {
        name:"English",
        pointsTotal:100,
        scores: [
          {
            name: "Terms of America Reflection",
            pointsEarned: 24,
            pointsTotal: 25
          },
          {
            name: "Crucible Act 1 Writing Assignment",
            pointsEarned: 97,
            pointsTotal: 100
          },
          {
            name: "The Crucible Final Exploration",
            pointsEarned: 93,
            pointsTotal: 100
          },
          {
            name: "Ligeia Reflection",
            pointsEarned: 23,
            pointsTotal: 25
          },
        ]
      },
      {
        name:"French",
        pointsTotal:100,
        scores: [
          {
            name: "Terms of America Reflection",
            pointsEarned: 21,
            pointsTotal: 20
          },
          {
            name: "Crucible Act 1 Writing Assignment",
            pointsEarned: 99,
            pointsTotal: 100
          },
          {
            name: "The Crucible Final Exploration",
            pointsEarned: 98,
            pointsTotal: 100
          },
          {
            name: "Ligeia Reflection",
            pointsEarned: 23,
            pointsTotal: 25
          },
        ]
      }
    ]
  }
]




function forEachScore (tree, callback, position) {
  
  position = position || [0];
  
  for (var i = 0; i < tree.length; i++) {
    
    // update position
    position.pop();
    position.push(i);
    
    // log out position
    //console.log("\t".repeat(position.length) + JSON.stringify(position) + tree[i].name);
	callback(position);
	
	if (tree[i].scores != null) {
		// recurse deeper into tree
		forEachScore(tree[i].scores, callback, position.concat(i));
    }
  }
  
}

function getScorePositions () {
	
	var positions = [];
	
	forEachScore(testTree, function (position) {
		positions.push(position.slice(0));
	})
	
	return positions;
}

function getLeafScores () {
	
	var positions = getScorePositions().reverse();
	var leaves = [];
	
	for (var i = 0; i < positions.length; i++) {
		
		
	}
	
}

function getObj (tree, position, depth) {
	
	depth = depth || 0;
	
	// recurse into tree
	// depth + 1 because when (position.length > depth), you need to
	// return tree[position[depth]]
	if (position.length > depth + 1) {
		return getObj(tree[position[depth]].scores, position, ++depth);
	}
	else {
		
		// if depth reached, return tree at that point 
		return tree[position[depth]];
	}
}
