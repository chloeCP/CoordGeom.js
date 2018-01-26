// - MARK: defining properties of class Point
class Point {
  // init function
  constructor(x,y) {
    this.x = x; // TYPE: float
    this.y = y; // TYPE: float
  }
  
  // all below calculated properties are relative to origin
  get angle() {
    return Math.atan2(this.y, this.x); // TYPE: float
  }
  get slope() {
    return this.y/this.x; // TYPE: float
  }
  get distance() {
    return Math.hypot(this.x, this.y); // TYPE: float
  }
  
  // methods
  translate(x, y) {
    this.x = this.x + x;
    this.y = this.y + y;
    return this; // TYPE: Point
  }
  // all below methods are relative to origin or the axes
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this; // TYPE: Point
  }
  flipX() {
    this.x = -this.x;
    return this; // TYPE: Point
  }
  flipY() {
    this.y = -this.y;
    return this; // TYPE: Point
  }
  scale(factor) {
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this; // TYPE: Point
  }
  scaleX(factor) {
    this.x = this.x*factor;
    return this; // TYPE: Point
  }
  scaleY(factor) {
    this.y = this.y*factor;
    return this; // TYPE: Point
  }
  update(x,y) {
    this.x = x;
    this.y = y;
    return this; // TYPE: Point
  }
  clone() {
    return new Point(this.x, this.y);
  }
  
}

// - MARK: define class Line
class Line {
  // init
  constructor(point1, point2) {
    this.point1 = point1.clone();
    this.point2 = point2.clone();
  }
  
  // calculated properties
  get m() {
    if (this.point1.x != this.point2.x) {
      var dx = this.point1.x - this.point2.x;
      var dy = this.point1.y - this.point2.y;
      return dy/dx;
    } else {
      return NaN;
    }
  }
  get yIntercept() {
    if (!isNaN(this.m)) {
      return new Point(0, this.point1.y - this.m*this.point1.x);
    } else {
      return NaN;
    }
  }
  get c() {
    if (!isNaN(this.m)) {
      return this.point1.y - this.m*this.point1.x
    } else {
      return NaN;
    }
  }
  get xIntercept() {
    if (this.m != 0 && !isNaN(this.m)) {
      return new Point(this.point1.x - this.point1.y/this.m, 0);
    } else if (this.m == 0) {
      return NaN;
    } else {
      return new Point(this.point1.x, 0);
    }
  }
  get isVertical() {
    return isNaN(this.m);
  }
  get isHorizontal() {
    return (this.m == 0);
  }
}

// - MARK: define class lineSegment
class LineSegment {
  // init
  constructor(point1, point2) {
    this.point1 = point1.clone(); // TYPE: Point
    this.point2 = point2.clone(); // TYPE: Point
  }
  
  // calculated properties
  get midpoint() {
    var x = (this.point1.x + this.point2.x)/2;
    var y = (this.point1.y + this.point2.y)/2
    return new Point(x,y); // TYPE: Point
  }
  get dx() {
    return this.point2.x - this.point1.x; // TYPE: float
  }
  get dy() {
    return this.point2.y - this.point1.y; // TYPE: float
  }
  get length() {
    return Math.hypot(this.dx, this.dy); // TYPE: float
  }
  get slope() {
    if (this.dx != 0) {
      return this.dy/this.dx; // TYPE: float
    } else {
      return NaN;
    }
  }
}

// - MARK: define class Vector
class Vector {
  
  // init properties
  constructor(x, y) {
    this.x = x; // TYPE: float
    this.y = y; // TYPE: float
  }
  
  // calculated properties
  get isZeroVector() {
    return (this.x == 0 && this.y == 0);
  }
  get angle() {
    if (!this.isZeroVector) {
      return Math.atan2(this.y, this.x); // TYPE: float
    } else {
      return NaN;
    }
  }
  get slope() {
    if (!this.isZeroVector && (this.x != 0)) {
      return this.y/this.x; // TYPE: float
    } else {
      return NaN;
    }
  }
  get magnitude() {
    return Math.hypot(this.x, this.y); // TYPE: float
  }
  get unitVector() {
    if (!this.isZeroVector) {
      return new Vector(this.x/this.magnitude, this.y/this.magnitude); // TYPE: Vector
    // cannot use scale due to float point error
    } else {
      return NaN;
    }
  }
  
  // methods
  rotate(angle) {
    var x = this.x;
    var y = this.y;
    this.x = x*Math.cos(angle) - y*Math.sin(angle);
    this.y = x*Math.sin(angle) + y*Math.cos(angle);
    return this; // TYPE: Vector
  }
  flipX() {
    this.x = -this.x;
    return this; // TYPE: Vector
  }
  flipY() {
    this.y = -this.y;
    return this; // TYPE: Vector
  }
  negative() {
    this.flipX().flipY();
    return this; // TYPE: Vector
  }
  scale(factor) {
    this.x = this.x*factor;
    this.y = this.y*factor;
    return this; // TYPE: Vector
  }
  scaleX(factor) {
    this.x = this.x*factor;
    return this; // TYPE: Vector
  }
  scaleY(factor) {
    this.y = this.y*factor;
    return this; // TYPE: Vector
  }
}

// MARK: - define class Polygon
class Polygon {
  
  // init
  constructor(points) {
    var pointsClone = [];
    for (var i=0; i<points.length; i++) {
      pointsClone.push(points[i].clone());
    }
    this.vertices = pointsClone; // TYPE: [point]
  }
  
  // calculated properties
  get numberOfVertices() {
    return this.vertices.length; // TYPE: int
  }
  get area() {
    var total1 = 0;
    var total2 = 0;
    var n = this.numberOfVertices;
    for (var i = 0; i < n; i++) {
      if (i == 0) {
        // handle first case
        total1 += this.vertices[0].x*this.vertices[1].y;
        total2 += this.vertices[0].x*this.vertices[n-1].y;
      } else if (i < n-1) {
        // handle anything in between
        total1 += this.vertices[i].x*this.vertices[i+1].y;
        total2 += this.vertices[i].x*this.vertices[i-1].y;
      } else {
        // handle last case
        total1 += this.vertices[n-1].x*this.vertices[0].y;
        total2 += this.vertices[n-1].x*this.vertices[n-2].y;
      }
    }
    return Math.abs(total1 - total2)/2; // TYPE: float
  }
  
  // methods
  translate(x,y) {
    for (var i=0; i<this.numberOfVertices; i++) {
      this.vertices[i].translate(x,y);
    }
    return this; // TYPE: Polygon
  }
  
}

// MARK: - define class Circle
class Circle {
  
  // init
  constructor(center, radius) {
    this.center = center.clone(); // TYPE: Point
    this.radius = radius; // TYPE: float
  }
  
  // calculated properties
  get diameter() {
    return this.radius*2;
  }
  get area() {
    return Math.PI*this.radius*this.radius; // TYPE: float
  }
  get circumference() {
    return Math.PI*2*this.radius; // TYPE: float
  }
  
  // methods
  translate(x,y) {
    this.center.translate(x,y);
    return this; // TYPE: Circle
  }
  setRadius(r) {
    this.radius = r;
    return this; // TYPE: Circle
  }
}


// MARK: - geometrical functions

function interceptOfLines(line1, line2) {
  if ((line1.m != line2.m) && !isNaN(line1.m) && !isNaN(line2.m)) {
    var x = (line2.c-line1.c)/(line1.m-line2.m);
    return new Point(x,line1.m*x+line1.c);
  } else if ((isNaN(line1.m) && isNaN(line2.m)) || (line1.m == line2.m)) {
    return NaN
  } else {
    if (isNaN(line1.m)) {
      var x = line1.xIntercept.x;
      return new Point(x, line2.m*x + line2.c);
    } else {
      var x = line2.xIntercept.x;
      return new Point(x, line1.m*x + line1.c);
    }
  }
}
function lineFromPointSlope(point, m) {
  var point2 = newPointByVector(point, new Vector(1,m));
  return new Line(point, point2);
}
function lineFromPoints(point1, point2) {
  var x1 = point1.x;
  var y1 = point1.y;
  var x2 = point2.x;
  var y2 = point2.y;
  return new Line((y2-y1)/(x2-x1), y1-(y2*x1-y1*x1)/(x2-x1));
}
function newPointByVector(point, vector) {
  return new Point(point.x+vector.x, point.y+vector.y);
}
function vectorFromPoints(point1, point2) {
  return new Vector(point2.x - point1.x, point2.y - point1.y);
}
function newPointReflectInLine(point, line) {
  if (!isNaN(line.m) && (line.m != 0)) {
    var m2 = -1/line.m;
    var line2 = lineFromPointSlope(point, m2);
    var intercept = interceptOfLines(line, line2);
    var change = vectorFromPoints(point, intercept);
    return newPointByVector(intercept, change);
  } else if (line.m == 0) {
    return new Point(point.x, 2*line.c - point.y);
  } else {
    return new Point(2*line.xIntercept.x - point.x, point.y);
  }
}
function dotProduct(vector1, vector2) {
  return vector1.x*vector2.x + vector1.y*vector2.y;
}
function angleBetweenVectors(vector1, vector2) {
  if (!vector1.isZeroVector && !vector2.isZeroVector) {
    return Math.acos(dotProduct(vector1, vector2)/(vector1.magnitude*vector2.magnitude));
  } else {
    return NaN;
  }
}
function intersectionOfCircleAndLine(circle, line) {
  var r = circle.radius;
  var a = circle.center.x;
  var b = circle.center.y;
  if (!isNaN(line.m)) {
    var m = line.m;
    var c = line.c;
    var qa = m*m + 1;
    var qb = 2*(m*(c-b)-a);
    var qc = a*a + (c-b)*(c-b) - r*r;
    var delta = qb*qb - 4*qa*qc;
    if (delta < 0) {
      return [];
    } else if (delta == 0) {
      var x = -qb/(2*qa);
      return [new Point(x, x*m + c)];
    } else {
      var x1 = (-qb + Math.sqrt(delta))/(2*qa);
      var x2 = (-qb - Math.sqrt(delta))/(2*qa);
      return [new Point(x1, x1*m + c), new Point(x2, x2*m + c)];
    }
  } else {
    // update when point in/out/on circle is implemented?
    var x = line.xIntercept.x;
    var d = Math.abs(x - a);
    if (d < r) {
      return [new Point(x,b+Math.sqrt(r*r-d*d)), new Point(x,b-Math.sqrt(r*r-d*d))];
    } else if (d == r) {
      return [new Point(x, b)];
    } else {
      return [];
    }
  }
}
