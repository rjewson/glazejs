precision mediump float;
uniform vec2 projectionVector;
uniform vec2 cameraPosition;

attribute vec2 position;
attribute float size;
attribute vec4 colour;
varying vec4 vColor;

void main() {
    gl_PointSize = size;
    vColor = colour;
    gl_Position = vec4( (cameraPosition.x + position.x) / projectionVector.x -1.0, (cameraPosition.y + position.y) / -projectionVector.y + 1.0 , 0.0, 1.0);            
}