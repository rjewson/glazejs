precision mediump float;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform sampler2D tiles;
uniform sampler2D sprites;

uniform vec2 inverseTileTextureSize;
uniform vec2 inverseSpriteTextureSize;
uniform float tileSize;

const vec2 EMPTY_TILE = vec2(1.0, 1.0);

void main(void) {
    vec4 tile = texture2D(tiles, texCoord);
    // if (tile.x == 1.0 && tile.y == 1.0) { 
        // discard;
    // } else {
        vec2 superSpriteOffset = floor(tile.zw * 256.0) * 256.0;
        vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;
        vec2 spriteCoord = mod(pixelCoord, tileSize);
        float empty = float(all(lessThan(tile.xy, EMPTY_TILE)));

        // TODO?
        // Way to flip the tile. Works.
        //    spriteCoord.x = (-1.0+(2.0* 0.0)) * (( 0.0*tileSize) - spriteCoord.x); //normal  0
        //    spriteCoord.x = (-1.0+(2.0* 1.0)) * (( 1.0*tileSize) - spriteCoord.x); //flip   1

        gl_FragColor = texture2D(sprites, (superSpriteOffset + spriteOffset + spriteCoord) * inverseSpriteTextureSize) * empty;
    // }
}