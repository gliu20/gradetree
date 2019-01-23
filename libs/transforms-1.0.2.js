/**
 * @description Various transformations for drawings
 * @author George Liu
 * @version 1.0.2
 */
(function () {



  /**
   * Iterates through each point in a drawing
   * @param {Array} stroke - an array of points
   * @param {function} callback - evaluated for each point in drawing
   */
  let _forEachPointIn = function (stroke, callback) {
    var point;

    for (var i = 0; i < stroke.length; i++) {
      point = stroke[i];
      callback(point,i);
    }
  }
  
  /**
   * Iterates through each stroke in a drawing
   * @param {Array} drawing - array of strokes that contains an array of points
   * @param {function} callback - evaluated for each stroke in drawing
   */
  let _forEachStrokeIn = function (drawing, callback) {
    var stroke;

    for (var i = 0; i < drawing.length; i++) {
      stroke = drawing[i];
      callback(stroke,i);
    }
  }
  

  /**
   * Converts angle measures from degrees to radians
   * @param {Number} degrees - angle measure in degrees
   * @returns {Number} angle measure in radians
   */
  let _toRadians = function (degrees) {
    return degrees / 180 * Math.PI;
  }

  /**
   * Gets the bounding box of an image
   * @param {Array} drawing - array of strokes that contains an array of points
   * @returns {Object} boundingBox with properties xMin, xMax, yMin, yMax
   */
  let _getBoundingBox = function (drawing) {
    let x, y;
    var xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity;
    
    _forEachStrokeIn(drawing, function (stroke) {
      _forEachPointIn(stroke, function (point) {
        x = point[0];
        y = point[1];

        xMin = Math.min(x,xMin);
        xMax = Math.max(x,xMax);
        yMin = Math.min(y,yMin);
        yMax = Math.max(y,yMax);
      })
    })
    
    return {
      "xMin":xMin,
      "xMax":xMax,
      "yMin":yMin,
      "yMax":yMax
    };
  }
//  
//  /**
//   * Calculates the distance from a point to a line
//   * @param {Array} point - [x,y]
//   * @param {Object} line
//   * @param {Array} line.point1 - [x,y] end points of the line
//   * @param {Array} line.point2 - [x,y] end points of the line
//   */
//  let _distToLine  = function (point,line) {
//    let x = point[0];
//    let y = point[1];
//    
//    let p1 = line["point1"];
//    let p2 = line["point2"];
//    
//    let lm = (p1[0] - p2[0]) / (p1[1] - p2[1]);
//
//    if (lm === Infinity) {
//      lm = 999;
//      console.log("new" + lm)
//    }
//    if (lm === -Infinity) {
//      lm = -999;
//
//      console.log("new" + lm)
//    }
//
//    let lb = p1[1] - (lm * p1[0]);
//    
//    console.log(lm,lb)
//
//    
//
//    let a = -lm
//    let b = 1;
//    let c = lb;
//    
//    /*
//     * FORMULA:
//     * 
//     * where x₁,y₁ is the point and Ax + By + C = 0 is the line
//     *     |Ax₁ + By₁ + C|
//     * d = –––––––––––––––
//     *       √(A² + B²)
//     */
//    
//    return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
//  }
//  
//  /**
//   * Finds the furthest point from the line approximation of the stroke.
//   * Returns the index and distance of the point
//   * @param {Array} stroke - array of points
//   * @returns {Object} object with properties index, maxDist
//   */
//  let _findFurthestPoint = function (stroke) {
//    let maxDist = 0;
//    let index = 0;
//    let end = stroke.length - 1;
//    let dist;
//    
//    _forEachPointIn(stroke, function (point,i) {
//      
//      // get perpendicular distance from point to line
//      dist = _distToLine(point, {
//        "point1": stroke[0],
//        "point2": stroke[end]
//      })
//      
//      console.log(point,stroke[0],stroke[end])
//      console.log(dist)
//      // distance is greater than current max distance
//      // set index of furthest point to the new point
//      if (dist > maxDist) {
//        index = i;
//        maxDist = dist;
//      }
//    })
//    
//    return {
//      "maxDist":maxDist,
//      "index":index
//    }
//  }
//  
//  let _douglasPeucker = function (stroke, epsilon) {
//    let indices = [0, stroke.length - 1];
//    let furthestPoint;
//    let newStroke = [];
//
//    for (var i = 0; (i + 1) < indices.length; i++) {
//      console.log(stroke.slice(indices[i],indices[i + 1] + 1))
//      furthestPoint = _findFurthestPoint(stroke.slice(indices[i],indices[i + 1] + 1));
//      console.log(furthestPoint["maxDist"] )
//      if (furthestPoint["maxDist"] > epsilon) {
//        indices.splice(i + 1,0,furthestPoint["index"] + 1);
//        console.log(furthestPoint["index"] + 1)
//        i = 0;
//      }
//      console.log(indices)
//    }
//
//    for (var i = 0; i < indices.length; i++) {
//      newStroke.push(stroke[indices[i]]);
//    }
//
//    return newStroke;
//  }
//
//  /*let _douglasPeuckerBACKUP = function (stroke, epsilon) {
//    let furthestPoint = _findFurthestPoint(stroke);
//    
//    let maxDist = furthestPoint["maxDist"];
//    let index = furthestPoint["index"];
//    
//    let end = stroke.length - 1;
//    
//    let result = [];
//    let resultRec1;
//    let resultRec2;
//    
//    // if max distance is greater than epsilon, recursively simplify
//    if (maxDist > epsilon) {
//      resultRec1 = _douglasPeucker(stroke.slice(0, index + 1), epsilon);
//      resultRec2 = _douglasPeucker(stroke.slice(index + 1, end + 1), epsilon);
//      
//      // build result array
//      result = resultRec1.concat(resultRec2);
//    }
//    else {
//      // otherwise return the result
//      
//      result.push(stroke[0]);
//      result.push(stroke[end]);
//    }
//    
//    //console.log(result)
//    
//    return result;
//  }*/
//  
  let transforms = {
    /**
     * Shifts drawing to the right by `shiftX` and down by `shiftY`.
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} options.shiftX - shift right by `options.shiftX` units
     * @param {Number} options.shiftY - shift down by `options.shiftY` units
     */
    shift: function (drawing, options) {
      _forEachStrokeIn(drawing, function (stroke) {
        _forEachPointIn(stroke, function (point) {
          point[0] += options["shiftX"];
          point[1] += options["shiftY"];
        })
      })
    },
    
    /**
     * Simplifies the drawing using the Ramer–Douglas–Peucker algorithm.
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} options.epsilon - degree of simplification
     */
    simplify: function (drawing, options) {
      //_forEachStrokeIn(drawing, function (stroke,i) {
      //    drawing[i] = _douglasPeucker(stroke, options["epsilon"]);
      //})
    },
    
    
    /**
     * Scales drawing.
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} options.scaleX - stretch horizantally by `options.scaleX` units
     * @param {Number} options.scaleY - stretch verticallly by `options.scaleY` units
     * @param {Number} [options.originX=0] - stretch from `options.originX`
     * @param {Number} [options.originY=0] - stretch from `options.originY`
     */
    scale: function (drawing, options) {
      _forEachStrokeIn(drawing, function (stroke) {
        _forEachPointIn(stroke, function (point) {

          point[0] -= options["originX"] || 0;
          point[1] -= options["originY"] || 0;

          point[0] *= options["scaleX"];
          point[1] *= options["scaleY"];

          point[0] += options["originX"] || 0;
          point[1] += options["originY"] || 0;
        })
      })
    },

    /**
     * Resizes drawing.
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} options.targetW - target width
     * @param {Number} options.targetH - target height
     * @param {Number} options.currW - current width
     * @param {Number} options.currH - current height
     * @param {Number} [options.originX=0] - resizes from `options.originX`
     * @param {Number} [options.originY=0] - resizes from `options.originY`
     */
    resize: function (drawing, options) {
      transforms.scale(drawing, {
        "scaleX": options["targetW"] / options["currW"],
        "scaleY": options["targetH"] / options["currH"],
        "originX": options["originX"] || 0,
        "originY": options["originY"] || 0
      });
    },

    /**
     * Rotates drawing. Positive = clockwise rotation.
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} [options.radians] - clockwise rotation by `options.radians`
     * @param {Number} [options.degrees] - clockwise rotation by `options.degrees`
     * @param {Number} [options.originX=0] - center of rotation
     * @param {Number} [options.originY=0] - center of rotation
     */
    rotate: function (drawing, options) {
      _forEachStrokeIn(drawing, function (stroke) {
        _forEachPointIn(stroke, function (point) {

          let pointX, pointY;
          let theta = options["radians"] || _toRadians(options["degrees"]);

          //reverse rotation so positive = clockwise
          theta = 0 - theta;

          point[0] -= options["originX"] || 0;
          point[1] -= options["originY"] || 0;
        
        
          pointX = point[0];
          pointY = point[1];
        
          /* 
           * FORMULA:
           * x' = x cos 0 - y sin 0
           * y' = y cos 0 + x sin 0
           * 
           * REFERENCES:
           * https://math.stackexchange.com/questions/156833/how-to-find-a-point-after-rotation
           * https://stackoverflow.com/questions/20104611/find-new-coordinates-of-a-point-after-rotation
           *
           */

          point[0] = pointX * Math.cos(theta) - pointY * Math.sin(theta);
          point[1] = pointY * Math.cos(theta) + pointX * Math.sin(theta);

          point[0] += options["originX"] || 0;
          point[1] += options["originY"] || 0;
        })
      })
    },

    /**
     * Slants drawing. Positive = clockwise rotation.
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} [options.radiansX] - rotate x axis clockwise by `options.radiansX`
     * @param {Number} [options.degreesX] - rotate x axis clockwise by `options.degreesX`
     * @param {Number} [options.radiansY] - rotate x axis clockwise by `options.radiansY`
     * @param {Number} [options.degreesY] - rotate x axis clockwise by `options.degreesY`
     * @param {Number} [options.originX=0] - center of rotation
     * @param {Number} [options.originY=0] - center of rotation
     */
    shear: function (drawing, options) {
      _forEachStrokeIn(drawing, function (stroke) {
        _forEachPointIn(stroke, function (point) {
    
          let pointX, pointY;
          let thetaX = options["radiansX"] || _toRadians(options["degreesX"]);
          let thetaY = options["radiansY"] || _toRadians(options["degreesY"]);

          //reverse rotation so positive = clockwise
          thetaX = 0 - thetaX || 0;
          thetaY = 0 - thetaY || 0;

          point[0] -= options["originX"] || 0;
          point[1] -= options["originY"] || 0;
        
        
          pointX = point[0];
          pointY = point[1];
        
          /* 
           * FORMULA:
           * x' = x cos 0 - y sin 0
           * y' = y cos 0 + x sin 0
           * 
           * REFERENCES:
           * https://math.stackexchange.com/questions/156833/how-to-find-a-point-after-rotation
           * https://stackoverflow.com/questions/20104611/find-new-coordinates-of-a-point-after-rotation
           *
           */

          point[0] = pointX * Math.cos(thetaX) - pointY * Math.sin(thetaX);
          point[1] = pointY * Math.cos(thetaY) + pointX * Math.sin(thetaY);

          point[0] += options["originX"] || 0;
          point[1] += options["originY"] || 0;
        })
      })
    },

    /**
     * Centers drawing by center of mass.
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} [options.imageS] - sidelengths of image (if square)
     * @param {Number} [options.imageW] - width of image
     * @param {Number} [options.imageH] - height of image
     */
    center: function (drawing, options) {
      let numOfPoints = 0;
      let centerMassX = 0;
      let centerMassY = 0;

      let actualCenterX = options["imageW"] || options["imageS"];
      let actualCenterY = options["imageH"] || options["imageS"];
      
      actualCenterX = actualCenterX / 2;
      actualCenterY = actualCenterY / 2;
      
      _forEachStrokeIn(drawing, function (stroke) {
        _forEachPointIn(stroke, function (point) {
          centerMassX += point[0];
          centerMassY += point[1];

          numOfPoints++;
        })
      })
      
      
      //center of mass is calculated by the average of all points
      centerMassX = centerMassX / numOfPoints;
      centerMassY = centerMassY / numOfPoints;

      //target center - actual center = shift factor
      centerMassX -= actualCenterX;
      centerMassY -= actualCenterY;
      
      transforms.shift(drawing, {
        "shiftX": 0 - centerMassX,
        "shiftY": 0 - centerMassY
      });
    },
    
    /**
     * Adjusts drawing to fit within viewbox
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Object} options
     * @param {Number} [options.imageS] - sidelengths of image (if square)
     * @param {Number} [options.imageW] - width of image
     * @param {Number} [options.imageH] - height of image
     * @param {Boolean} [options.center=false] - centers image within viewbox 
     * @param {Boolean} [options.preserveAspectRatio=false] - preserve aspect ratio
     */
    fitViewBox: function (drawing, options) {
      let boundingBox = _getBoundingBox(drawing);

      let xMin = boundingBox["xMin"];
      let xMax = boundingBox["xMax"];
      let yMin = boundingBox["yMin"];
      let yMax = boundingBox["yMax"];

      let lengthX = xMax - xMin;
      let lengthY = yMax - yMin;

      let w = options["imageW"] || options["imageS"];
      let h = options["imageH"] || options["imageS"];
      let ws;
      let hs;
      let s;
      

      transforms.shift(drawing, {
        "shiftX": 0 - xMin,
        "shiftY": 0 - yMin
      });

      if (!options["preserveAspectRatio"]) {
        transforms.resize(drawing, {
          "targetW": w,
          "targetH": h,
          "currW": lengthX,
          "currH": lengthY
        })
      }
      else {
        ws = w / lengthX;
        hs = h / lengthY;
        
        if (ws > hs) {
          s = hs;
        }
        else {
          s = ws;
        }
        
        transforms.scale(drawing, {
          "scaleX": s,
          "scaleY": s
        });
        
        if (options["center"]) {
          transforms.shift(drawing, {
            shiftX: (w - (lengthX * s)) / 2,
            shiftY: (h - (lengthY * s)) / 2
          });
        }
      }
    },

    /**
     * Gets grayscale value of pixels
     * @param {Array} drawing - array of strokes that contains an array of points
     * @param {Number} w - width of image
     * @param {Number} h - height of image
     * @returns {Array} array of pixels with values from 0 to 1
     */
    toPixels: (function () {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      return function (drawing, w, h) {
        let img;
        let out = [];
        
        canvas.width = w;
        canvas.height = h;
        
        ctx.clearRect(0,0,w,h);
        ctx.beginPath()
        for (var i = 0; i < drawing.length; i++) {
    	    ctx.moveTo(drawing[i][0][0],drawing[i][0][1]);
    	    for (var j = 0; j < drawing[i].length; j++) {
    		    ctx.lineTo(drawing[i][j][0],drawing[i][j][1]);
    	    }
        }
        ctx.stroke();

        img = ctx.getImageData(0,0,w,h).data;

        for (var i = 0; i < img.length; i += 4) {
          out.push(img[i + 3]/255);
        }

        return out;
      }
    })()
  };

  window["transforms"] = transforms;
})();
