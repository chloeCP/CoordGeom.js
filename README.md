# CoordGeom.js
A JavaScript framework developed for coordinate geometry calculation with vectors.

## Note
Please note that this framework is still under construction.

## CAUTION
- **WARNING**: This library **DOES NOT** handle float point error.  Please bare this in mind.
- when constructing new polygon, please check whether the points really form one before setting up the new object.
- all points passed to new *polygon*, new *line segment* and new *circle* will be cloned, therefore de-referenced.  So any changes made to the point forming the algebraic object will not affect the already created object.

## Capabilities
This framework currently covers the following objects:
- point
- line
- vector
- line segment
- polygon
- circle

Also the following cross object functions:
- intercept of two lines
- line from point and slope
- line from line segment
- new point translated by vector
- vector from two points
- new point reflected in line
- dot product of two vectors
- angle between two vectors
- intersection of a circle and a line
- point is on line
- point is on line segment
- point is strictly in circle
- point is on circle circumference
- point is strictly out of circle
- point is strictly in polygon
- point is on polygon edge
- point is strictly out of polygon
- the points draw a polygon
