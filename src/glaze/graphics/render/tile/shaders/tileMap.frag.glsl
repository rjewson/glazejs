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

    if (tile.xy == EMPTY_TILE) {
        discard;
    }
    //if (!all(lessThan(tile.xy, EMPTY_TILE))) {
    //    discard;
    //}

    // vec2 superSpriteOffset = floor(tile.zw * 256.0) * 256.0;
    // float infoByte = tile.z * 255.0;
    // vec2 superSpriteOffset = floor(vec2(mod(infoByte, SUPER_SPRITE_SHEET_WIDTH) , infoByte / SUPER_SPRITE_SHEET_WIDTH)) * 256.0;
    
    // https://stackoverflow.com/questions/55176947/how-to-store-state-flags-in-floating-point-numbers-for-glsl-webgl
    //bool flag1 = mod(flags, 2.0) > 0.;
    //bool flag2 = mod(floor(flags /dw 2.0), 2.0) > 0.;
    //bool flag3 = mod(floor(flags / 4.0), 2.0) > 0.;

    float infoByte = tile.z * 256.0;
    
    // extract the orientation bits
    float diagonal = mod(floor(infoByte / 32.0), 2.0);
    float vertical = mod(floor(infoByte / 64.0), 2.0);
    float horizontal  = mod(floor(infoByte / 128.0), 2.0);

    // remove the orientation bits to get the original sheet ID
    float superSheetID = floor(infoByte - floor(horizontal * 128.0) - floor(vertical * 64.0) - floor(diagonal * 32.0));
    vec2 superSpriteOffset = floor(vec2(mod(superSheetID, SUPER_SPRITE_SHEET_WIDTH) , superSheetID / SUPER_SPRITE_SHEET_WIDTH)) * 256.0;

    vec2 flip = vec2( vertical, horizontal);

    vec2 spriteOffset = floor(tile.xy * 256.0) * tileSize;
    vec2 spriteCoord = mod(pixelCoord, tileSize); 

    // Flip the tile
    spriteCoord = abs((tileSize * flip) - spriteCoord);
    // spriteCoord.xy = mix(spriteCoord.xy, spriteCoord.yx, diagonal);
    if (diagonal > 0.0) {
        spriteCoord.xy = spriteCoord.yx;
    }

    //float empty = float(all(lessThan(tile.xy, EMPTY_TILE)));
    gl_FragColor = texture2D(sprites, ( superSpriteOffset + spriteOffset + spriteCoord) * inverseSpriteTextureSize);// * empty;
}