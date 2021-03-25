precision highp float;
attribute vec2 position;
attribute vec2 texture;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform vec2 viewOffset;
uniform vec2 viewportSize;
uniform vec2 inverseTileTextureSize;
uniform float inverseTileSize;

void main(void) {
    // vec2 offset = viewOffset + (inverseTileSize / 2.0);
    // offset -= mod(offset, inverseTileSize);
    // pixelCoord = (texture * viewportSize) + offset;

    pixelCoord = (texture * viewportSize) + viewOffset;
    texCoord = pixelCoord * inverseTileTextureSize * inverseTileSize;
    gl_Position = vec4(position, 0.0, 1.0);
}