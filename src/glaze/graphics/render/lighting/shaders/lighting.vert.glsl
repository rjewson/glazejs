precision mediump float;

uniform vec2 projectionVector;
uniform vec2 viewOffset;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute vec3 aArc;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec3 vArc;

void main(void) {
    gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = aColor;
    vArc = aArc;
}