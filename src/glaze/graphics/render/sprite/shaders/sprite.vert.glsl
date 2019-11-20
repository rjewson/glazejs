precision mediump float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute float aColor;
uniform vec2 projectionVector;
varying vec2 vTextureCoord;
varying float vColor;
void main(void) {
    gl_Position = vec4( aVertexPosition.x / projectionVector.x -1.0, aVertexPosition.y / -projectionVector.y + 1.0 , 0.0, 1.0);
    vTextureCoord = aTextureCoord;
    vColor = aColor;
}