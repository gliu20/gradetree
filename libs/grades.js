(function () {
  
  var DEFAULTS = {
    percentToLetter: {
      percent: [97,93,90,87,83,80,77,73,70,67,65,0],
      letter: ["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","F"]
    },
    percentToGPA: {
      percent: [97,93,90,87,83,80,77,73,70,67,65,0],
      GPA: [4.4,4.0,3.7,3.4,3.0,2.7,2.4,2.0,1.7,1.4,1.0,0.0]
    }
  }
  
  var Grade = {};
  
  
  Grade.percentToLetter = function (percent,gradesys) {
  
    gradesys = gradesys || DEFAULTS.percentToLetter;
    
    for (var i = 0; i < gradesys.percent.length; i++) {
      if (percent >= gradesys.percent[i]) {
        return gradesys.letter[i];
      }
    }
    
  }
  
  Grade.percentToGPA = function (percent,gradesys) {
  
    gradesys = gradesys || DEFAULTS.percentToGPA;
    
    for (var i = 0; i < gradesys.percent.length; i++) {
    
      // check if grade meets the range
      if (percent >= gradesys.percent[i]) {
      
        // interpolate if possible
        if (gradesys.percent[i - 1] !== undefined) {
          return (percent - gradesys.percent[i]) *
                  // slope
                  (gradesys.GPA[i - 1] - gradesys.GPA[i]) / 
                  (gradesys.percent[i - 1] - gradesys.percent[i]) +
              
                  // y-intercept
                  gradesys.GPA[i];
        }
        else {
        
          // otherwise just return value from chart
          return gradesys.GPA[i]
        }
        
      }
      
    }
    
  }
  
  Grade.toAccuracy = function (number,digits) {
    return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
  }
  
  window["Grade"] = Grade;
  
})();
