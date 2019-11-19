 precision mediump float;
uniform vec2 projectionVector;
// uniform vec2 flip;

attribute vec2 position;
attribute float size;
attribute vec2 tilePosition;
attribute vec2 tileDimension;
attribute vec2 colour;
varying vec2 vTilePos;
varying vec2 tileDim;
// varying vec2 vColor;
void main() {
    vTilePos = tilePosition;
    tileDim = tileDimension;
    gl_PointSize = size;
    // vColor = colour;
    gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);            
}