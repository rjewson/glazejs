precision mediump float;
attribute vec2 position;
attribute vec2 texture;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform vec2 viewOffset;
uniform vec2 viewportSize;
uniform vec2 inverseTileTextureSize;
uniform float inverseTileSize;

void main(void) {
    pixelCoord = (texture * viewportSize) + viewOffset;
    texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;
    gl_Position = vec4(position, 0.0, 1.0);
}