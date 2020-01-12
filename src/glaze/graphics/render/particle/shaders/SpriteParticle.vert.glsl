 precision mediump float;
uniform vec2 projectionVector;

attribute vec2 position;
attribute float size;
attribute vec2 tilePosition;
attribute vec2 tileDimension;
attribute vec2 colour;
varying vec2 vTilePos;
varying vec2 tileDim;
void main() {
    vTilePos = tilePosition;
    tileDim = tileDimension;
    gl_PointSize = size;
    gl_Position = vec4( position.x / projectionVector.x -1.0, position.y / -projectionVector.y + 1.0 , 0.0, 1.0);            
}