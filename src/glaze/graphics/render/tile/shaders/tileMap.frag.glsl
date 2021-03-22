precision highp float;

varying vec2 pixelCoord;
varying vec2 texCoord;

uniform sampler2D tiles;
uniform sampler2D sprites;

uniform vec2 inverseTileTextureSize;
uniform vec2 inverseSpriteTextureSize;
uniform float tileSize;

const vec2 EMPTY_TILE = vec2(1.0, 1.0);

// Max 8*8 sheets = 64 tile sets
const float SUPER_SPRITE_SHEET_WIDTH = 8.0;
const float SUPER_SPRITE_SHEET_HEIGHT = 8.0;

void main(void) {
    vec4 tile = texture2D(tiles, texCoord);
    //if (!all(lessThan(tile.xy, EMPTY_TILE))) {
    //    discard;
    //}

    // vec2 superSpriteOffset = floor(tile.zw * 256.0) * 256.0;
    float infoByte = tile.z * 255.0;
    vec2 superSpriteOffset = floor(vec2(mod(infoByte, SUPER_SPRITE_SHEET_WIDTH) , infoByte / SUPER_SPRITE_SHEET_WIDTH)) * 256.0;
    
    // https://stackoverflow.com/questions/55176947/how-to-store-state-flags-in-floating-point-numbers-for-glsl-webgl
    //bool flag1 = mod(flags, 2.0) > 0.;
    //bool flag2 = mod(floor(flags / 2.0), 2.0) > 0.;
    //bool flag3 = mod(floor(flags / 4.0), 2.0) > 0.;
    //float flag7 = mod(floor(infoByte / 64.0), 2.0);
    //float flag8 = mod(floor(infoByte / 128.0), 2.0);

    vec2 spriteOffset = floor(tile.xy * 255.0) * tileSize;
    vec2 spriteCoord = mod(pixelCoord, tileSize);

    float empty = float(all(lessThan(tile.xy, EMPTY_TILE)));

    // TODO?
    // Way to flip the tile. Works.
    //    spriteCoord.x = (-1.0+(2.0* 0.0)) * (( 0.0*tileSize) - spriteCoord.x); //normal  0
    //    spriteCoord.x = (-1.0+(2.0* 1.0)) * (( 1.0*tileSize) - spriteCoord.x); //flip   1
    gl_FragColor = texture2D(sprites, ( superSpriteOffset + spriteOffset + spriteCoord) * inverseSpriteTextureSize) * empty;
}